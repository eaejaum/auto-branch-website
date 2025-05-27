import express from "express";
import { createVehicle, editVehicle, getAllVehicles, getVehicleById, removeVehicle } from "../controllers/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.get("/", getAllVehicles);
vehicleRouter.get(`/:id`, getVehicleById);
vehicleRouter.post("/", createVehicle);
vehicleRouter.put("/", editVehicle);
vehicleRouter.delete("/:id", removeVehicle);

export default vehicleRouter;