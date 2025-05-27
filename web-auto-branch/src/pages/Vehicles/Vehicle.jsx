import { Box, Button, Flex, Spinner } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./Vehicle.module.css";
import CreateVehicleModal from "./components/CreateVehicleModal";

function Vehicle() {
    // const { loading, branches, getAllBranches } = useBranchContext();
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
                        {/* {Array.isArray(branches) && branches.map((branch) => (
                            <VehicleCard key={branch.id} branch={branch} />
                        ))} */}
                    </Flex>
                )}
            </Box>
            <CreateVehicleModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        </>
    )
};

export default Vehicle;