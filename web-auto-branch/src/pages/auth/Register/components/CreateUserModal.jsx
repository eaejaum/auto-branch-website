import React, { useState } from "react";
import { AlertDialog, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import styles from "./CreateUserModal.module.css";
import { formatCpf } from "../../../../utils/formatCpf";
import { unformatCpf } from "../../../../utils/unformatCpf";
import { useAuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function CreateUserModal({ open, onOpenChange }) {
    const navigate = useNavigate();
    const { register, registerError, loading } = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [registerAlert, setRegisterAlert] = useState(false);
    const [isEmployeeAdmin, setIsEmployeeAdmin] = useState(false);

    function clearForm() {
        setName('');
        setEmail('');
        setCpf('');
        setPassword('');
        setIsEmployeeAdmin(false);
    }

    function handleCpfChange(e) {
        const input = e.target.value;
        const numbers = formatCpf(input);
        let formatted = numbers;

        setCpf(formatted);
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const req = await register(name, email, unformatCpf(cpf), password, isEmployeeAdmin);
            if (req)
                clearForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Cadastrar Funcionário!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={(e) => handleRegister(e)}
                    className={styles.registerForm}
                >
                    <label className="inputLabel">Email</label>
                    <input
                        className="input"
                        value={email}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite o email do funcionário..."
                    />
                    <label className="inputLabel">Nome</label>
                    <input
                        className="input"
                        value={name}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Digite o nome do funcionário..."
                    />
                    <label className="inputLabel">CPF</label>
                    <input
                        className="input"
                        value={cpf}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => handleCpfChange(e)}
                        type="text"
                        placeholder="Digite o CPF do funcionário..."
                    />
                    <label className="inputLabel">Senha</label>
                    <input
                        className="input"
                        value={password}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Crie uma senha para o usuário..."
                    />
                    {registerError && <span className="errorMessage">{registerError}</span>}
                    <Text as="label" size="1" style={{ marginTop: "10px" }}>
                        <Flex gap="2">
                            <Checkbox checked={isEmployeeAdmin} onClick={() => setIsEmployeeAdmin(!isEmployeeAdmin)} style={{ cursor: "pointer" }} />
                            Funcionário Administrador?
                        </Flex>
                    </Text>
                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button type="submit" className={styles.saveButton}>Salvar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default CreateUserModal;
