import { insertUser, selectUserByEmail } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

export const createUserService = async ({ name, email, cpf, password, isAdmin }) => {
    if (!name || !email || !cpf || !password)
        throw new AppError("Preencha todos os campos", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    return await insertUser(name, email, cpf, hashedPassword, isAdmin);
};

export const getUserByEmailService = async ({ email }) => {
    const user = await selectUserByEmail(email);
    if (!user)
        throw new AppError("Usuário não encontrado", 400);

    return user;
};

export const loginUserService = async ({ email, password }) => {
    if (!email || !password)
        throw new AppError("Preencha os campos corretamente", 400);

    const user = await selectUserByEmail(email);
    if (!user)
        throw new AppError("Usuário não encontrado", 400);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
        throw new AppError("E-mail ou senha incorretos", 400);

    // const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    //   expiresIn: "1h",
    // });

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        isAdmin: user.isAdmin,
    };

    return userWithoutPassword;
};