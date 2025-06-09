import express from "express";
import { loginUser, createUser, getAllUsers, getUserById, removeUser, editUser, getAllManagers, getAllUsersByBranchId } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);
userRouter.get("/managers/", getAllManagers);
userRouter.get("/:id", getUserById);
userRouter.get("/branch/:id", getAllUsersByBranchId);
userRouter.post("/", createUser);
userRouter.put("/", editUser);
userRouter.delete("/:id", removeUser);

export default userRouter;