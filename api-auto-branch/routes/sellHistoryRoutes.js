import express from "express";
import { getAllSalesHistory, getAllSalesHistoryByBranchId, sellVehicle } from "../controllers/sellHistoryController.js";

const sellHistoryRouter = express.Router();

sellHistoryRouter.get("/", getAllSalesHistory);
sellHistoryRouter.post("/", sellVehicle);
sellHistoryRouter.get("/branch/:id", getAllSalesHistoryByBranchId);

export default sellHistoryRouter;