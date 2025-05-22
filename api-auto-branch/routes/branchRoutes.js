import express from "express";
import { createBranch, editBranch, getAllBranches, getBranchById, removeBranch } from "../controllers/branchController.js";

const branchRouter = express.Router();

branchRouter.get("/", getAllBranches);
branchRouter.get(`/:id`, getBranchById);
branchRouter.post("/", createBranch);
branchRouter.put("/", editBranch);
branchRouter.delete("/:id", removeBranch);

export default branchRouter;