import { createContext, useContext, useState } from "react";

export const BranchContext = createContext(null);

export function BranchProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [branches, setBranches] = useState([]);

    async function getAllBranches() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("http://localhost:3000/api/branches/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const responseData = await response.json();

            if(!response.ok) {
                setError(responseData.message);
                return false;
            }

            setBranches(responseData.data);
            return true;
        } catch (error) {
            setError("Erro ao listar concessionárias");
            return false;
        } finally {
            setLoading(false);
        }
    };

    async function createBranch(name, city, state, cep, phoneNumber) {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("http://localhost:3000/api/branches/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, city, state, cep, phoneNumber })
            });

            const responseData = await response.json();

            if(!response.ok) {
                setError(responseData.message);
                return false
            }

            const updatedBranches = getAllBranches();
            setBranches(updatedBranches);
        
            return true;
        } catch (error) {
            setError("Erro ao criar concessionária");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <BranchContext.Provider value={{ branches, loading, error, getAllBranches, createBranch }}>
            {children}
        </BranchContext.Provider>
    )
};

export function useBranchContext() {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error("useBranchContext must be used within an BranchProvider");
    };
    return context;
};