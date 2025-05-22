import express from "express";
import { createBranch, editBranch, getAllBranches, getBranchById } from "../controllers/branchController.js";
import { deleteBranch } from "../models/branchModel.js";

const branchRouter = express.Router();

branchRouter.get("/", getAllBranches);
branchRouter.get(`/:id`, getBranchById);
branchRouter.post("/", createBranch);
branchRouter.put("/", editBranch);
branchRouter.delete("/:id", deleteBranch);

export default branchRouter;