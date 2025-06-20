import { selectAllSalesHistory, sellVehicleModel } from "../models/sellHistoryModel.js";
import { AppError } from "../utils/appError.js";

export const sellVehicleService = async ({ vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice }) => {
    if (!vehicleId || !branchId || !userId || !sellPrice || !totalPrice)
        throw new AppError("Preencha os campos corretamente", 400);

    return await sellVehicleModel(vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice);
};

export const getAllSalesHistoryService = async () => {
    return await selectAllSalesHistory();
};