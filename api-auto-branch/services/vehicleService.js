import { deleteVehicle, insertVehicle, selectAllVehicles, selectVehicleById, updateVehicle } from "../models/vehicleModel.js";
import { AppError } from "../utils/appError.js";

export const getAllVehiclesService = async () => {
    return await selectAllVehicles();
};

export const getVehicleByIdService = async (id) => {
    const vehicle = await selectVehicleById(id);

    if (!vehicle)
        throw new AppError("Veículo não encontrado", 400);

    return vehicle;
};

export const createVehicleService = async ({ brand, model, version, gearbox, color, motorization, plate, value, branchId }) => {
    if (!brand || !model || !version || !gearbox || !color || !motorization || !plate || !value || !branchId)
        throw new AppError("Preencha os campos corretamente", 400);

    return await insertVehicle(brand, model, version, gearbox, color, motorization, plate, value, branchId);
};

export const editVehicleService = async ({ id, brand, model, version, gearbox, color, motorization, plate, value, branchId }) => {
    const existingVehicle = await selectVehicleById(id);

    if (!existingVehicle)
        throw new AppError("Veículo não encontrado", 400);

    if (!brand || !model || !version || !gearbox || !color || !motorization || !plate || !value || !branchId)
        throw new AppError("Preencha os campos corretamente", 400);

    return await updateVehicle(id, brand, model, version, gearbox, color, motorization, plate, value, branchId);
};

export const removeVehicleService = async (id) => {
    const existingVehicle = selectVehicleById(id);

    if (!existingVehicle)
        throw new AppError("Veículo não encontrado", 400);

    return await deleteVehicle(id);
};