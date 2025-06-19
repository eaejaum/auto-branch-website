import express from "express";
import { createVehicle, editVehicle, getAllVehicles, getAllVehiclesByBranchId, getVehicleById, removeVehicle } from "../controllers/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.get("/", getAllVehicles);
vehicleRouter.get(`/:id`, getVehicleById);
vehicleRouter.get("/branch/:id", getAllVehiclesByBranchId);
vehicleRouter.post("/", createVehicle);
vehicleRouter.put("/", editVehicle);
vehicleRouter.delete("/:id", removeVehicle);

export default vehicleRouter;