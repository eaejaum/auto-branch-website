import { Box, Button, Flex, Spinner } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./Vehicle.module.css";
import CreateVehicleModal from "./components/CreateVehicleModal";
import { useVehicleContext } from "../../context/vehicleContext";
import VehicleCard from "./components/VehicleCard";
import { Link } from "react-router-dom";

function Vehicle() {
    const { loading, vehicles, getAllVehicles } = useVehicleContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        getAllVehicles();
    }, []);

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Lista de Veiculos</h1>
                    <Button onClick={() => setIsAddModalOpen(true)} ><Plus color="#FFF" height={14} width={14} /> Nova Compra</Button>
                </Flex>
                {loading ? (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>
                ) : (
                    <Flex justify="start" align="start" gap="4" wrap="wrap">
                        {Array.isArray(vehicles) && vehicles.map((vehicle) => (
                            <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} style={{ textDecoration: "none" }}>
                                <VehicleCard vehicle={vehicle} />
                            </Link>
                        ))}
                    </Flex>
                )}
            </Box>
            <CreateVehicleModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        </>
    )
};

export default Vehicle;