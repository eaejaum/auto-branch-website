import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import styles from "./CreateUserModal.module.css";
import { formatCpf } from "../../../../utils/formatCpf";
import { unformatCpf } from "../../../../utils/unformatCpf";
import { useAuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useBranchContext } from "../../../../context/branchContext";

function CreateUserModal({ open, onOpenChange }) {
    const { register, registerError, loading, user } = useAuthContext();
    const { getAllBranches, branches } = useBranchContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [branch, setBranch] = useState(0);

    useEffect(() => {
        if(user.roleId == 1) {
            getAllBranches();
        }
    }, [])

    function clearForm() {
        setName('');
        setEmail('');
        setCpf('');
        setPassword('');
        setRole(0);
        setBranch(0);
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
            if (branch == 0)
                setBranch(null);
            
            const req = await register(name, email, unformatCpf(cpf), password, role, branch);
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

                    <label className="inputLabel">Cargo</label>
                    <select
                        className="input"
                        value={role}
                        onChange={(e) => setRole(parseInt(e.target.value))}
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    >
                        <option value={0}>Selecione o cargo...</option>
                        {user.roleId === 1 && (
                            <>
                                <option value={2}>Gerente</option>
                            </>)}
                        <option value={3}>Vendedor</option>
                    </select>

                    {user.roleId === 1 && (
                        <>
                            <label className="inputLabel">Concessionária</label>
                            <select
                                className="input"
                                value={branch}
                                onChange={(e) => setBranch(parseInt(e.target.value))}
                                style={{
                                    border: "1px solid #ccc",
                                    // error ? "1px solid red" : 
                                }}
                            >
                                <option value={0}>Selecione a concessionária...</option>
                                {Array.isArray(branches) && branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {registerError && <span className="errorMessage">{registerError}</span>}

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

export default CreateUserModal;
