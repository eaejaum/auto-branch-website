import { Box } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./SellHistory.module.css";
import { useEffect, useState } from "react";
import { useVehicleContext } from "../../context/vehicleContext";
import { useAuthContext } from "../../context/authContext";

function SellHistory() {
    const { user } = useAuthContext();
    // const { getAllSales, getAllSalesByBranchId } = useVehicleContext();

    useEffect(() => {
        // async function getSales() {
        //     if (user.roleId == 1) {
        //         await getAllSales();
        //     } else {
        //         await getAllSalesByBranchId(user.branchId);
        //     }
        // }
        // getSales();
    }, []);

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <h1 className={styles.title}>Histórico de Vendas</h1>
            </Box>
        </>
    )
};

export default SellHistory;