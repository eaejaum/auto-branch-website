import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import styles from "./SellModal.module.css";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useAuthContext } from "../../../context/authContext";
import { useSellHistoryContext } from "../../../context/sellHistoryContext";
import { useEffect, useState } from "react";

function SellModal({ open, onOpenChange, vehicle, refreshVehicle }) {
    const { user } = useAuthContext();
    const { getAllVehicles, getAllVehiclesByBranchId } = useVehicleContext();
    const { sellVehicle } = useSellHistoryContext();

    const [originalValue, setOriginalValue] = useState(0);
    const [discountInput, setDiscountInput] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (open) {
            const value = Number(vehicle.value) || 0;
            setOriginalValue(value);
            setDiscountInput("");
            setDiscountPercent(0);
            setTotalValue(value);
            setSuccess("");
            setErrorMessage("");
        }
    }, [open]);

    function handleDiscountChange(e) {
        const rawValue = e.target.value.replace(",", ".");
        setDiscountInput(rawValue);

        const parsedPercent = parseFloat(rawValue);

        if (!isNaN(parsedPercent) && parsedPercent >= 0 && parsedPercent <= 100) {
            setDiscountPercent(parsedPercent);
            const discountValue = (originalValue * parsedPercent) / 100;
            setTotalValue(originalValue - discountValue);
        } else {
            setDiscountPercent(0);
            setTotalValue(originalValue);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess("");
        setErrorMessage("");

        if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            setErrorMessage("Desconto inválido");
            return;
        }

        const ok = await sellVehicle(
            vehicle.id,
            vehicle.branchId,
            user.id,
            originalValue,
            discountPercent,
            totalValue
        );

        if (ok) {
            if (user.roleId === 1) {
                await getAllVehicles();
            } else {
                await getAllVehiclesByBranchId(user.branchId);
            }
            if (typeof refreshVehicle === "function") {
                await refreshVehicle();
            }
            setSuccess("Veículo vendido com sucesso!");
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Vender Veículo!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: "pointer" }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form id="sell-form" onSubmit={handleSubmit} className={styles.loginForm}>
                    <label className="inputLabel">Valor Inicial</label>
                    <input
                        id="sell-original-value"
                        className="input"
                        value={originalValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                        disabled
                        type="text"
                        style={{ border: "1px solid #ccc" }}
                    />

                    <label className="inputLabel">Desconto (%)</label>
                    <input
                        id="sell-discount"
                        className="input"
                        value={discountInput}
                        onChange={handleDiscountChange}
                        type="text"
                        placeholder="Digite o desconto em %"
                        style={{ border: "1px solid #ccc" }}
                    />

                    <label className="inputLabel">Valor Final com Desconto</label>
                    <input
                        id="sell-total-value"
                        className="input"
                        value={totalValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                        disabled
                        type="text"
                        style={{ border: "1px solid #ccc" }}
                    />

                    {errorMessage && (
                        <span className="errorMessage">{errorMessage}</span>
                    )}
                    {success && (
                        <span className="successMessage">{success}</span>
                    )}

                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button id="sell-submit" type="submit" className={styles.saveButton}>
                                Salvar
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default SellModal;
