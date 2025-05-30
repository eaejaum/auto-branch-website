import { Box, Button, Flex, Spinner, Table } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./Employee.module.css";
import { Plus } from "lucide-react";
import CreateUserModal from "../auth/Register/components/CreateUserModal";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { formatCpf } from "../../utils/formatCpf";

function Employee() {
    const { loading, users, getAllUsers } = useAuthContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Lista de Funcionários</h1>
                    <Button onClick={() => setIsAddModalOpen(true)} ><Plus color="#FFF" height={14} width={14} /> Novo Funcionário</Button>
                </Flex>

                <Table.Root className={styles.tableContainer}>
                    <Table.Header className={styles.tableHeader}>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>CPF</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Cargo</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {loading ? (
                        <Table.Body>
                            <Flex justify="center" align="center">
                                <Spinner />
                            </Flex>
                        </Table.Body>

                    ) : (
                        <Table.Body>
                            {Array.isArray(users) && users.map((user) => (
                                    <Table.Row key={user.id} className={styles.tableRow}>
                                        <Table.Cell className={styles.tableCell}>{user.name}</Table.Cell>
                                        <Table.Cell className={styles.tableCell}>{user.email}</Table.Cell>
                                        <Table.Cell className={styles.tableCell}>{formatCpf(user.cpf)}</Table.Cell>
                                        <Table.Cell className={styles.tableCell}>{user.roleId == 1 ? "Administrador" : user.roleId == 2 ? "Gerente" : "Vendedor"}</Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    )}

                </Table.Root>
            </Box>
            <CreateUserModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        </>
    )
};

export default Employee;