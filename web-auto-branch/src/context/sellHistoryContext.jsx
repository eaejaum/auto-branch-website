import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./authContext";

export const SellHistoryContext = createContext(null);

export function SellHistoryProvider({ children }) {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [salesHistory, setSalesHistory] = useState([]);

    async function getAllSalesHistory() {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:3000/api/sell/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
                return false;
            }

            setError(false);
            setSalesHistory(responseData.data)
            return true;
        } catch (error) {
            setError("Erro ao listar histórico de vendas");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function getAllSalesHistoryByBranchId(branchId) {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch(`http://localhost:3000/api/sell/branch/${branchId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
                return false;
            }

            setError(false);
            setSalesHistory(responseData.data);
            return true
        } catch (error) {
            setError("Erro ao listar histórico de vendas");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function sellVehicle(vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice) {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:3000/api/sell/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice })
            });
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
                return false
            }

            setError(false);
            return true;
        } catch (error) {
            setError("Erro ao vender veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <SellHistoryContext.Provider value={{ loading, error, salesHistory, sellVehicle, getAllSalesHistory, getAllSalesHistoryByBranchId }}>
            {children}
        </SellHistoryContext.Provider>
    )
};

export function useSellHistoryContext() {
    const context = useContext(SellHistoryContext);
    if (!context) {
        throw new Error("useSellHistoryContext must be used within an SellHistoryProvider");
    };
    return context;
};