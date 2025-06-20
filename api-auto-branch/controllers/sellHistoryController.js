import { getAllSalesHistoryService, sellVehicleService } from "../services/sellHistoryService.js";

export const sellVehicle = async (req, res) => {
    try {
        await sellVehicleService(req.body);
        res.status(201).json({
            message: "Veículo vendido com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const getAllSalesHistory = async (req, res) => {
    try {
        const history = await getAllSalesHistoryService();
        res.status(200).json({
            data: history,
            message: "Histórico de vendas listado com sucesso!"
        });
    } catch (err) {
      const status = err.statusCode || 500;
      res.status(status).json({ message: err.message });
    }
};