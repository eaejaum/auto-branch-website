import express from "express";
import { createVehicle, editVehicle, getAllVehicles, getAllVehiclesByBranchId, getVehicleById, removeVehicle, sellVehicle } from "../controllers/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.post("/sell/", sellVehicle);
vehicleRouter.get("/", getAllVehicles);
vehicleRouter.get(`/:id`, getVehicleById);
vehicleRouter.get("/branch/:id", getAllVehiclesByBranchId);
vehicleRouter.post("/", createVehicle);
vehicleRouter.put("/", editVehicle);
vehicleRouter.delete("/:id", removeVehicle);

export default vehicleRouter;