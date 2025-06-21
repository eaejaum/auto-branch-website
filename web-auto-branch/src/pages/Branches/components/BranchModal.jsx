import { z } from 'zod';
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./BranchModal.module.css";
import { useBranchContext } from "../../../context/branchContext";
import { formatCep } from "../../../utils/formatCep";
import { unformatCep } from "../../../utils/unformatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { unformatPhoneNumber } from "../../../utils/unformatPhoneNumber";

export const branchSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    state: z.string().nonempty("Estado é obrigatório"),
    city: z.string().nonempty("Cidade é obrigatória"),
    cep: z
        .string()
        .nonempty("CEP é obrigatório")
        .refine((val) => val.length >= 9, { message: "CEP inválido" }),
    phoneNumber: z
        .string()
        .nonempty("Número é obrigatório")
        .refine((val) => val.length >= 14, { message: "Número inválido" }),
});

function BranchModal({ open, onOpenChange, branch }) {
    const { createBranch, editBranch } = useBranchContext();

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (branch) {
            setName(branch.name);
            setState(branch.state);
            setCity(branch.city);
            setCep(formatCep(branch.cep));
            setPhoneNumber(formatPhoneNumber(branch.phoneNumber));
        }
    }, [branch])

    const states = [
        { acronym: "AC", name: "Acre" },
        { acronym: "AL", name: "Alagoas" },
        { acronym: "AP", name: "Amapá" },
        { acronym: "AM", name: "Amazonas" },
        { acronym: "BA", name: "Bahia" },
        { acronym: "CE", name: "Ceará" },
        { acronym: "DF", name: "Distrito Federal" },
        { acronym: "ES", name: "Espírito Santo" },
        { acronym: "GO", name: "Goiás" },
        { acronym: "MA", name: "Maranhão" },
        { acronym: "MT", name: "Mato Grosso" },
        { acronym: "MS", name: "Mato Grosso do Sul" },
        { acronym: "MG", name: "Minas Gerais" },
        { acronym: "PA", name: "Pará" },
        { acronym: "PB", name: "Paraíba" },
        { acronym: "PR", name: "Paraná" },
        { acronym: "PE", name: "Pernambuco" },
        { acronym: "PI", name: "Piauí" },
        { acronym: "RJ", name: "Rio de Janeiro" },
        { acronym: "RN", name: "Rio Grande do Norte" },
        { acronym: "RS", name: "Rio Grande do Sul" },
        { acronym: "RO", name: "Rondônia" },
        { acronym: "RR", name: "Roraima" },
        { acronym: "SC", name: "Santa Catarina" },
        { acronym: "SP", name: "São Paulo" },
        { acronym: "SE", name: "Sergipe" },
        { acronym: "TO", name: "Tocantins" }
    ];


    function clearForm() {
        setName('');
        setState('');
        setCity('');
        setCep('');
        setPhoneNumber('');
    }

    function validateField(field, value) {
        const singleFieldSchema = branchSchema.pick({ [field]: true });
        const result = singleFieldSchema.safeParse({ [field]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: result.success ? undefined : result.error.flatten().fieldErrors[field],
        }));
    }

    function handleCepChange(e) {
        const input = e.target.value;
        const numbers = formatCep(input);

        setCep(numbers);
        validateField("cep", numbers);
    }

    function handlePhoneChange(e) {
        const input = e.target.value;
        const numbers = formatPhoneNumber(input);

        setPhoneNumber(numbers);
        validateField("phoneNumber", numbers);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            state,
            city,
            cep,
            phoneNumber,
        };

        const result = branchSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        try {
            let req;
            if (!branch) {
                req = await createBranch(
                    name,
                    city,
                    state,
                    unformatCep(cep),
                    unformatPhoneNumber(phoneNumber)
                );
            } else {
                req = await editBranch(
                    branch.id,
                    name,
                    city,
                    state,
                    unformatCep(cep),
                    unformatPhoneNumber(phoneNumber)
                );
            }

            if (req) {
                clearForm();
                setErrors({});
                onOpenChange(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>{branch ? "Editar" : "Cadastrar"} Concessionária!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={handleSubmit}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Nome</label>
                    <input
                        className="input"
                        value={name}
                        onChange={(e) => {
                            const value = e.target.value;
                            setName(value);
                            validateField("name", value);
                        }}
                        type="text"
                        placeholder="Digite o nome da concessionária..."
                        style={{
                            border: errors.name ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.name && <span className="errorMessage">{errors.name[0]}</span>}

                    <label className="inputLabel">Estado</label>
                    <select
                        className="input"
                        value={state}
                        onChange={(e) => {
                            const value = e.target.value;
                            setState(value);
                            validateField("state", value);
                        }}
                        style={{
                            border: errors.state ? "1px solid red" : "1px solid #ccc",
                        }}
                    >
                        <option value="">Selecione o estado da concessionária...</option>
                        {states && states.map((state) => (
                            <option key={`${state.acronym}-${state.name}`} value={state.acronym}>{state.name}</option>
                        ))}
                    </select>
                    {errors.state && <span className="errorMessage">{errors.state[0]}</span>}


                    <label className="inputLabel">Cidade</label>
                    <input
                        className="input"
                        value={city}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCity(value);
                            validateField("city", value);
                        }}
                        type="text"
                        name="text"
                        placeholder="Digite a cidade da concessionária..."
                        style={{
                            border: errors.city ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.city && <span className="errorMessage">{errors.city[0]}</span>}

                    <label className="inputLabel">CEP</label>
                    <input
                        className="input"
                        value={cep}
                        onChange={(e) => handleCepChange(e)}
                        type="text"
                        name="text"
                        placeholder="Digite o CEP da concessionária..."
                        style={{
                            border: errors.cep ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.cep && <span className="errorMessage">{errors.cep[0]}</span>}

                    <label className="inputLabel">Número de Contato</label>
                    <input
                        className="input"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e)}
                        type="text"
                        name="text"
                        placeholder="Digite o número de contato da concessionária..."
                        style={{
                            border: errors.phoneNumber ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.phoneNumber && <span className="errorMessage">{errors.phoneNumber[0]}</span>}

                    <Flex justify="end">
                        <Button type="submit" className={styles.saveButton}>Salvar</Button>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default BranchModal;