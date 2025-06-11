import Navbar from "../../../components/Navbar";
import { Flex, Box, Text, Button } from "@radix-ui/themes";
import styles from "./VehicleDetails.module.css";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

function VehicleDetails() {
    const { vehicleId } = useParams();
    const { getVehicleById, loading } = useVehicleContext();
    const [vehicle, setVehicle] = useState();

    useEffect(() => {
        if (!loading && vehicleId) {
            async function fetchVehicle() {
                const response = await getVehicleById(vehicleId);
                setVehicle(response);
            };

            fetchVehicle();
        }
    }, [vehicleId])

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Detalhes do Veículo</h1>
                </Flex>
                {loading && !vehicle && (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>
                )}
                {!loading && vehicle && (
                    <Box className={styles.vehicleCard}>
                        <Flex direction="column" gap="6">
                            <Flex justify="between">
                                <Flex direction="column">
                                    <Text className={styles.vehicleName}>{(vehicle.brand).toUpperCase()} <span>{(vehicle.model).toUpperCase()}</span></Text>
                                    <Text className={styles.vehicleEspecification}>{`${(vehicle.version).toUpperCase()} ${(vehicle.motorization).toUpperCase()} ${(vehicle.gearbox).toUpperCase()}`}</Text>
                                </Flex>
                                <Flex gap="1">
                                    <Text className={styles.vehiclePrice}>R${Number(vehicle.value).toFixed(0)}</Text>
                                    <button className={styles.actionButton}>
                                        <Trash width={15} height={15} color="#F3123C" />
                                    </button>
                                    <button className={styles.actionButton}>
                                        <Edit width={15} height={15} color="#2563EB" />
                                    </button>
                                </Flex>
                            </Flex>
                            <Flex justify="between" align="end">
                                <div className={styles.vehicleInfos}>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Ano</span>
                                            <Text className={styles.textInfo}>{vehicle.year}</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Quilômetragem</span>
                                            <Text className={styles.textInfo}>{Number(vehicle.km).toFixed(0)}</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Câmbio</span>
                                            <Text className={styles.textInfo}>{vehicle.gearbox}</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Placa</span>
                                            <Text className={styles.textInfo}>{vehicle.plate}</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Cor</span>
                                            <Text className={styles.textInfo}>{vehicle.color}</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Flex direction="column">
                                            <span className={styles.spanInfo}>Estado</span>
                                            <Text className={styles.textInfo}>{vehicle.branch.state}</Text>
                                        </Flex>
                                    </Box>
                                </div>
                                <button className={styles.sellButton}>
                                    <Text className={styles.buttonText}>VENDER</Text>
                                </button>
                            </Flex>
                        </Flex>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default VehicleDetails;