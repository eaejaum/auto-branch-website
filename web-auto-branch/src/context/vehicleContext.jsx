import { createContext, useContext, useState } from "react";

export const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    async function getAllVehicles() {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:3000/api/vehicles/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const responseData = await response.json();

            if(!response.ok) {
                setError(responseData.message);
                return false;
            }

            setError(false);
            setVehicles(responseData.data)
        } catch (error) {
            setError("Erro ao listar veículos");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function createVehicle(brand, model, version, year, gearbox, color, motorization, plate, value, branchId) {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:3000/api/vehicles/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ brand, model, version, year, gearbox, color, motorization, plate, value, branchId })
            });
            
            console.log('bateu aqui', response)
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
                return false
            }
            
            setError(false);
            const updatedVehicles = getAllVehicles();
            setVehicles(updatedVehicles);

            return true;
        } catch (error) {
            setError("Erro ao criar veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <VehicleContext.Provider value={{ loading, error, vehicles, getAllVehicles, createVehicle }}>
            {children}
        </VehicleContext.Provider>
    )
};

export function useVehicleContext() {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error("useVehicleContext must be used within an VehicleProvider");
    };
    return context;
};