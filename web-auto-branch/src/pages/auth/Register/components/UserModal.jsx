import { z } from 'zod';
import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import styles from "./UserModal.module.css";
import { formatCpf } from "../../../../utils/formatCpf";
import { unformatCpf } from "../../../../utils/unformatCpf";
import { useAuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useBranchContext } from "../../../../context/branchContext";

const userSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(14, "CPF inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
    role: z.number().min(1, "Cargo é obrigatório"),
    branch: z.number().min(1, "Concessionária é obrigatória").optional(),
});

function UserModal({ open, onOpenChange, employee }) {
    const { register, registerError, editUser, loading, user } = useAuthContext();
    const { getAllBranches, branches } = useBranchContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [branch, setBranch] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user.roleId == 1) {
            getAllBranches();
        }
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setCpf(formatCpf(employee.cpf));
            setRole(employee.roleId);
            setBranch(employee.branchId);
        }
    }, [employee])

    function clearForm() {
        setName('');
        setEmail('');
        setCpf('');
        setPassword('');
        setRole(0);
        setBranch(0);
    }

    function validateField(field, value) {
        const fieldSchema = userSchema.pick({ [field]: true });
        const result = fieldSchema.safeParse({ [field]: value });

        setErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : result.error.flatten().fieldErrors[field],
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            cpf,
            password: !employee ? password : undefined,
            role,
            branch: user.roleId === 1 && role !== 1 ? branch : undefined,
        };

        const result = userSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        try {
            if (!employee) {
                await register(
                    name,
                    email,
                    unformatCpf(cpf),
                    password,
                    role,
                    branch ? branch : null
                );
            } else {
                await editUser(
                    parseInt(employee.id),
                    name,
                    email,
                    unformatCpf(cpf),
                    role,
                    branch
                );
            }

            clearForm();
            setErrors({});
            onOpenChange(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>{employee ? "Editar" : "Cadastrar"} Funcionário!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    id="user-form"
                    onSubmit={(e) => handleSubmit(e)}
                    className={styles.registerForm}
                >
                    <label className="inputLabel">Email</label>
                    <input
                        id="user-email"
                        className="input"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateField("email", e.target.value);
                        }}
                        type="email"
                        placeholder="Digite o email do funcionário..."
                        style={{
                            border: errors.email ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.email && <span className="errorMessage">{errors.email[0]}</span>}

                    <label className="inputLabel">Nome</label>
                    <input
                        id="user-name"
                        className="input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateField("name", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite o nome do funcionário..."
                        style={{
                            border: errors.name ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.name && <span className="errorMessage">{errors.name[0]}</span>}
                    <label className="inputLabel">CPF</label>
                    <input
                        id="user-cpf"
                        className="input"
                        value={cpf}
                        onChange={(e) => {
                            const input = e.target.value;
                            const formatted = formatCpf(input);
                            setCpf(formatted);
                            validateField("cpf", formatted);
                        }}
                        type="text"
                        placeholder="Digite o CPF do funcionário..."
                        style={{
                            border: errors.cpf ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.cpf && <span className="errorMessage">{errors.cpf[0]}</span>}
                    {!employee && (
                        <>
                            <label className="inputLabel">Senha</label>
                            <input
                                id="user-password"
                                className="input"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validateField("password", e.target.value);
                                }}
                                type="password"
                                placeholder="Crie uma senha para o usuário..."
                                style={{
                                    border: errors.password ? "1px solid red" : "1px solid #ccc",
                                }}
                            />
                            {errors.password && <span className="errorMessage">{errors.password[0]}</span>}
                        </>
                    )}

                    <label className="inputLabel">Cargo</label>
                    <select
                        id="user-role"
                        className="input"
                        value={role}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setRole(value);
                            validateField("role", value);
                        }}
                        style={{
                            border: errors.role ? "1px solid red" : "1px solid #ccc",
                        }}
                    >
                        <option value={0}>Selecione o cargo...</option>
                        {user.roleId === 1 && <option value={1}>Diretor</option>}
                        {user.roleId !== 3 && <option value={2}>Gerente</option>}
                        <option value={3}>Vendedor</option>
                    </select>
                    {errors.role && <span className="errorMessage">{errors.role[0]}</span>}

                    {user.roleId === 1 && role != 1 && (
                        <>
                            <label className="inputLabel">Concessionária</label>
                            <select
                                id="user-branch"
                                className="input"
                                value={branch}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setBranch(value);
                                    validateField("branch", value);
                                }}
                                style={{
                                    border: errors.branch ? "1px solid red" : "1px solid #ccc",
                                }}
                            >
                                <option value={0}>Selecione a concessionária...</option>
                                {branches && branches.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            {errors.branch && <span className="errorMessage">{errors.branch[0]}</span>}
                        </>
                    )}

                    <Flex justify="end">
                        <Button id="user-submit" type="submit" className={styles.saveButton}>Salvar</Button>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default UserModal;
