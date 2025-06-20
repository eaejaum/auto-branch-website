import { Box, Flex, Spinner, Table } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./SellHistory.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useSellHistoryContext } from "../../context/sellHistoryContext";

function SellHistory() {
    const { user } = useAuthContext();
    const { loading, salesHistory, getAllSalesHistory } = useSellHistoryContext();

    useEffect(() => {
        async function getSales() {
            if (user.roleId == 1) {
                await getAllSalesHistory();
            }
            // else {
            //     await getAllSalesByBranchId(user.branchId);
            // }
        }
        getSales();
    }, []);

    console.log(salesHistory)

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <h1 className={styles.title}>Histórico de Vendas</h1>
                {loading ? (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>

                ) : salesHistory && salesHistory.length > 0 && (
                    <Table.Root className={styles.tableContainer}>
                        <Table.Header className={styles.tableHeader}>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Veículo</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Placa</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Concessionária</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Vendedor</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Valor Veículo</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Desconto (%)</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Array.isArray(salesHistory) && salesHistory.map((sh) => (
                                <Table.Row key={sh.id} className={styles.tableRow}>
                                    <Table.Cell className={styles.tableCell}>{sh.vehicle.brand} {sh.vehicle.model}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{sh.vehicle.plate}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{sh.branch.name} - {sh.branch.state}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{sh.user.name}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>
                                        R${(sh.sellPrice).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{Number(sh.discountPercent).toFixed(0)} %</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>
                                        R$ {(sh.totalPrice).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                )}
            </Box>
        </>
    )
};

export default SellHistory;