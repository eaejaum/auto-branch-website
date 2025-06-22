import { Box, Button, Flex, Spinner } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./Vehicle.module.css";
import VehicleModal from "./components/VehicleModal";
import { useVehicleContext } from "../../context/vehicleContext";
import VehicleCard from "./components/VehicleCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

function Vehicle() {
    const { user } = useAuthContext();
    const { loading, vehicles, getAllVehicles, getAllVehiclesByBranchId } = useVehicleContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [statusSelect, setStatusSelect] = useState(1);

    useEffect(() => {
        if (user.roleId == 1) {
            getAllVehicles();
        } else {
            getAllVehiclesByBranchId(user.branchId)
        }
    }, []);

    const filteredVehicles = vehicles.filter((v) => {
        const status =
            statusSelect == 1 ? v.status == 1
            : v.status == 2;

        return status;
    });

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <Flex justify="between" gap="3" align="center">
                        <h1 className={styles.title}>Lista de Veiculos</h1>
                        <select className={styles.statusSelect} onChange={(e) => setStatusSelect(e.target.value)}>
                            <option value={1}>Disponíveis</option>
                            <option value={2}>Vendidos</option>
                        </select>
                    </Flex>
                    <Button id="add-vehicle-button" onClick={() => setIsAddModalOpen(true)} ><Plus color="#FFF" height={14} width={14} /> Novo Veículo</Button>
                </Flex>
                {loading ? (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>
                ) : (
                    <Flex justify="start" align="start" gap="4" wrap="wrap">
                        {filteredVehicles && Array.isArray(filteredVehicles) && filteredVehicles.map((vehicle) => (
                            <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} style={{ textDecoration: "none" }}>
                                <VehicleCard vehicle={vehicle} />
                            </Link>
                        ))}
                    </Flex>
                )}
            </Box>
            <VehicleModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        </>
    )
};

export default Vehicle;