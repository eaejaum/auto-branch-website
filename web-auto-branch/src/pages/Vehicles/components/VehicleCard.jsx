import { formatCep } from "../../../utils/formatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import styles from "./VehicleCard.module.css";

function VehicleCard({ branch }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{branch.name}</h3>

            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Responsável</span>
                <span className={styles.detailValue}>{''}</span>
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
        </div>
    );
};

export default VehicleCard;