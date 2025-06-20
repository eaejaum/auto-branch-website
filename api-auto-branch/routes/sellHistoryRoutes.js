import express from "express";
import { getAllSalesHistory, sellVehicle } from "../controllers/sellHistoryController.js";

const sellHistoryRouter = express.Router();

sellHistoryRouter.get("/", getAllSalesHistory);
sellHistoryRouter.post("/", sellVehicle);

export default sellHistoryRouter;