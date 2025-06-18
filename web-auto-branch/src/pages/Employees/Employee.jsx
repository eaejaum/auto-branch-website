import { Box, Button, Flex, Spinner, Table, Text } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./Employee.module.css";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { formatCpf } from "../../utils/formatCpf";
import DeleteModal from "../../components/DeleteModal";
import UserModal from "../auth/Register/components/UserModal";

function Employee() {
    const { loading, users, getAllUsers, getAllUsersByBranchId, deleteUser, user } = useAuthContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        if (user.roleId == 1) {
            getAllUsers();
        } else if (user.roleId == 2) {
            getAllUsersByBranchId(user.branchId);
        }
    }, []);

    
    function openEditModal(user) {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    }

    function openDeleteModal(user) {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    }

    async function handleDeleteUser() {
        await deleteUser(parseInt(selectedUser.id));
        setIsDeleteModalOpen(false);
        if (user.roleId == 1) {
            getAllUsers();
        } else if (user.roleId == 2) {
            getAllUsersByBranchId(user.branchId);
        }
    };

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
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
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
                                    <Table.Cell className={styles.tableCell}>
                                        <Flex gap="1" justify="end">
                                            <button className={styles.actionButton} onClick={() => openDeleteModal(user)}>
                                                <Trash width={15} height={15} color="#F3123C" />
                                            </button>
                                            <button className={styles.actionButton} onClick={() => openEditModal(user)}>
                                                <Edit width={15} height={15} color="#2563EB" />
                                            </button>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    )}

                </Table.Root>
            </Box>
            <UserModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} vehicle={user} />
            <DeleteModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} handleSubmit={handleDeleteUser} message="Tem certeza de que deseja excluir este funcionário?" title="Funcionário" />
        </>
    )
};

export default Employee;