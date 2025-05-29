import { formatCep } from "../../../utils/formatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import styles from "./VehicleCard.module.css";

function VehicleCard({ vehicle }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{(vehicle.brand).toUpperCase()} {(vehicle.model).toUpperCase()}</h3>
            <div>
                <p className={styles.infoText}>{(vehicle.version).toUpperCase()} {(vehicle.motorization).toUpperCase()} {(vehicle.gearbox).toUpperCase()}</p>
                <p className={styles.infoText}>{(vehicle.color).toUpperCase()}</p>
                <p className={styles.infoText}>{(vehicle.plate).toUpperCase()}</p>
                <p className={styles.infoText}>{(vehicle.branch.city).toUpperCase()}, {(vehicle.branch.state).toUpperCase()}</p>
            </div>
            <div className={styles.subinfo}>
                <p className={styles.priceText}>R${Number(vehicle.value).toFixed(0)}</p>
                <div className={styles.yearKmBox}>
                    <p className={styles.infoText}>{vehicle.year}</p>
                    <p className={styles.infoText}>{Number(vehicle.km).toFixed(0)} km</p>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;