import { Edit, Trash } from "lucide-react";
import { formatCep } from "../../../utils/formatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import styles from "./BranchCard.module.css";
import { Box, Flex } from "@radix-ui/themes";
import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";
import BranchModal from "./BranchModal";
import DeleteModal from "../../../components/DeleteModal";
import { useBranchContext } from "../../../context/branchContext";

function BranchCard({ branch }) {
    const { user } = useAuthContext();

    const { deleteBranch } = useBranchContext();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    async function handleDeleteBranch() {
        if (branch.id) {
            await deleteBranch(branch.id);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.title}>{(branch.name).toUpperCase()}</h3>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Telefone</span>
                    <span className={styles.detailValue}>{formatPhoneNumber(branch.phoneNumber || '')}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Cidade</span>
                    <span className={styles.detailValue}>{branch.city}</span>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Estado</span>
                    <span className={styles.detailValue}>{branch.state}</span>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>CEP</span>
                    <span className={styles.detailValue}>{formatCep(branch.cep || '')}</span>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Funcionários</span>
                    <span className={styles.detailValue}>{branch.employeeCount ?? 0}</span>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Veículos</span>
                    <span className={styles.detailValue}>{branch.vehicleCount ?? 0}</span>
                </div>


                {user.roleId == 1 || (user.roleId == 2 && user.branchId === branch.id) && (<div className={styles.divider}></div>)}
                <Flex justify="center" gap="2">
                    {user.roleId == 1 && (
                        <>
                            <button id={`delete-branch-${branch.id}`} className={styles.actionButton} onClick={() => setIsDeleteModalOpen(true)}>
                                <Trash width={15} height={15} color="#F3123C" />
                            </button>
                            <button id={`edit-branch-${branch.id}`} className={styles.actionButton} onClick={() => setIsEditModalOpen(true)}>
                                <Edit width={15} height={15} color="#2563EB" />
                            </button>
                        </>
                    )}

                    {(user.roleId == 2 && user.branchId === branch.id) && (
                        <button id={`edit-branch-${branch.id}`} className={styles.actionButton} onClick={() => setIsEditModalOpen(true)}>
                            <Edit width={15} height={15} color="#2563EB" />
                        </button>
                    )}
                </Flex>
            </div>
            <BranchModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} branch={branch} />
            <DeleteModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} branch={branch} handleSubmit={handleDeleteBranch} message="Tem certeza de que deseja excluir a concessionária?" title="Concessionária" />
        </>
    );
};

export default BranchCard;