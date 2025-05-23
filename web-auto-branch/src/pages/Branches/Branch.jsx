import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import styles from "./Branch.module.css";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import CreateBranchModal from "../Branches/components/CreateBranchModal";

function Branch() {
    // const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // const { logout } = useAuthContext();

    // function handleLogout() {
    //     logout();
    //     navigate("/login");
    // };

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Lista de Concessionárias</h1>
                    <Button onClick={() => setIsAddModalOpen(true)} className={styles.addBranchButton}><Plus color="#FFF" height={14} width={14} /> Nova Concessionária</Button>
                </Flex>
            </Box>
            <CreateBranchModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
            {/* <Button onClick={handleLogout}>Logout</Button> */}
        </>
    )
};

export default Branch;