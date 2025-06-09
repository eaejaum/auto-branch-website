import { Box, Button, Flex, Spinner } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import styles from "./Branch.module.css";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import CreateBranchModal from "../Branches/components/CreateBranchModal";
import BranchCard from "./components/BranchCard";
import { useBranchContext } from "../../context/branchContext";
import { useAuthContext } from "../../context/authContext";

function Branch() {
    const { user } = useAuthContext();
    const { loading, branches, getAllBranches } = useBranchContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if(!loading) {
            getAllBranches();
        }
    }, []);

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Lista de Concessionárias</h1>
                    {user.roleId == 1 && (<Button onClick={() => setIsAddModalOpen(true)}><Plus color="#FFF" height={14} width={14} /> Nova Concessionária</Button>)}
                </Flex>
                {loading ? (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>
                ) : (
                    <Flex justify="start" align="start" gap="4" wrap="wrap">
                        {Array.isArray(branches) && branches.map((branch) => (
                            <BranchCard key={branch.id} branch={branch} />
                        ))}
                    </Flex>
                )}
            </Box>
            <CreateBranchModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        </>
    )
};

export default Branch;