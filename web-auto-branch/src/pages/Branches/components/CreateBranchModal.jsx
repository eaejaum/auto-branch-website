import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";
import styles from "./CreateBranchModal.module.css";
import { useBranchContext } from "../../../context/branchContext";

function CreateBranchModal({ open, onOpenChange }) {
    const { createBranch } = useBranchContext();

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");

    function clearForm() {
        setName('');
        setState('');
        setCity('');
        setCep('');
    }

    async function handleCreateBranch(e) {
        e.preventDefault();
        try {
            const req = await createBranch(name, city, state, cep);
            if (req) {
                clearForm();
                onOpenChange(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Cadastrar Concessionária!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={handleCreateBranch}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Nome</label>
                    <input
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite o nome da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <label className="inputLabel">Estado</label>
                    <input
                        className="input"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite o estado da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <label className="inputLabel">Cidade</label>
                    <input
                        className="input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite a cidade da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <label className="inputLabel">CEP</label>
                    <input
                        className="input"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite o CEP da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button type="submit" className={styles.saveButton}>Salvar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default CreateBranchModal;