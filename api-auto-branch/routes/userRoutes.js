import express from "express";
import { loginUser, createUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/", createUser);

export default userRouter;