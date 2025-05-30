import { formatCep } from "../../../utils/formatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import styles from "./BranchCard.module.css";

function BranchCard({ branch }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{(branch.name).toUpperCase()}</h3>

            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Responsável</span>
                {/* <span className={styles.detailValue}>{branch.manager.name}</span> */}
            </div>

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

            {/* Exemplo de campo com destaque */}
            {branch.status && (
                <div className={`${styles.detailValue} ${styles.highlight}`}>
                    Status: {branch.status}
                </div>
            )}
        </div>
    );
};

export default BranchCard;