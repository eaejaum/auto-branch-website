import { createVehicleService, editVehicleService, getAllVehiclesService, getVehicleByIdService, removeVehicleService } from "../services/vehicleService.js";

export const getAllVehicles = async (req, res) => {
    try {
        const branches = await getAllVehiclesService();
        res.status(200).json({
            data: branches,
            message: "Veículos listados com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const getVehicleById = async (req, res) => {
    const { id } = req.params

    try {
        const branch = await getVehicleByIdService(id);
        res.status(200).json({
            data: branch,
            message: "Veículo listado com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const createVehicle = async (req, res) => {
    try {
        await createVehicleService(req.body);
        res.status(201).json({
            message: "Veículo criado com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const editVehicle = async (req, res) => {
    try {
        await editVehicleService(req.body);
        res.status(200).json({
            message: "Veículo editado com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const removeVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        await removeVehicleService(id);
        res.status(200).json({
            message: "Veículo removido com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};