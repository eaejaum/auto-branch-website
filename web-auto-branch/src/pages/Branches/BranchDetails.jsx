import { Box, Flex, Spinner } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./BranchDetails.module.css";
import { useEffect, useState } from "react";
import { useBranchContext } from "../../context/branchContext";
import { useParams } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { formatCep } from "../../utils/formatCep";

function BranchDetails() {
    const { branchId } = useParams();
    const { getBranchById, loading } = useBranchContext();
    const [branch, setBranch] = useState();

    useEffect(() => {
        if (!loading) {
            async function loadBranchById() {
                const response = await getBranchById(branchId);
                setBranch(response);
            }
            loadBranchById();
        }
    }, [branchId])

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <h1 className={styles.title}>Detalhes da Concessionária</h1>
                {loading && !branch && (
                    <Flex justify="center" align="center" margin="0 auto">
                        <Spinner />
                    </Flex>
                )}
                {!loading && branch && (
                    <div className={styles.card} style={{ gap: '2rem' }}>
                        <Flex justify="between" align="start" >
                            <h3 className={styles.cardTitle}>{branch.name}</h3>
                            <Flex gap="2">
                                <Trash width={20} className={styles.icon}/>
                                <Edit width={20} className={styles.icon}/>
                            </Flex>
                        </Flex>
                        <Flex gap="8">
                            <div>
                                <span className={styles.span}>Estado</span>
                                <p className={styles.paragraph}>{branch.state}</p>
                            </div>
                            <div>
                                <span className={styles.span}>Cidade</span>
                                <p className={styles.paragraph}>{branch.city}</p>
                            </div>
                            <div>
                                <span className={styles.span}>CEP</span>
                                <p className={styles.paragraph}>{formatCep(branch.cep)}</p>
                            </div>
                            <div>
                                <span className={styles.span}>CEP</span>
                                <p className={styles.paragraph}>{formatPhoneNumber(branch.phoneNumber)}</p>
                            </div>
                            <div>
                                <span className={styles.span}>Estoque</span>
                                <p className={styles.paragraph}>42 veiculos</p>
                            </div>
                            <div>
                                <span className={styles.span}>Funcionários</span>
                                <p className={styles.paragraph}>12 funcionários</p>
                            </div>
                        </Flex>
                    </div>
                )}
            </Box>
        </>
    )
}

export default BranchDetails;