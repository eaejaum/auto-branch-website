import { updateEmployeeCount } from "../models/branchModel.js";
import { insertUser, selectUserByEmail, selectAllUsers, deleteUser, updateUser, selectUserById, selectAllManagers, selectAllUsersByBranchId, updateUserProfile } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

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
        roleId: user.roleId,
        branchId: user.branchId,
    };

    return userWithoutPassword;
};

export const createUserService = async ({ name, email, cpf, password, roleId, branchId }) => {
    if (!name || !email || !cpf || !password || !roleId)
        throw new AppError("Preencha todos os campos", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser(name, email, cpf, hashedPassword, roleId, branchId);
    if (branchId) {
        await updateEmployeeCount(branchId);
    }

    return { message: "Usuário criado com sucesso" }
};

export const getAllUsersService = async () => {
    const users = await selectAllUsers()
    const usersWithoutPassword = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

    return usersWithoutPassword;
};

export const getUserByEmailService = async (email) => {
    const user = await selectUserByEmail(email);
    if (!user)
        throw new AppError("Usuário não encontrado", 400);

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        roleId: user.roleId,
        branchId: user.branchId,
    };

    return userWithoutPassword;
};

export const getAllManagersService = async () => {
    const managers = await selectAllManagers();
    const managersWithoutPassword = managers.map(({password, ...managersWithoutPassword}) => managersWithoutPassword);

    return managersWithoutPassword;
};

export const getAllUsersByBranchIdService = async (branchId) => {
    const users = await selectAllUsersByBranchId(branchId);
    const userList = Array.isArray(users) ? users : [users];
    
    const usersWithoutPassword = userList.map(({ password, ...u }) => u);
    return usersWithoutPassword;
};


export const getUserByIdService = async (id) => {
    const user = await selectUserById(id);
    if (!user)
        throw new AppError("Usuário não encontrado", 400);

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        roleId: user.roleId,
    };

    return userWithoutPassword;
};

export const editUserService = async ({ id, name, email, cpf, roleId, branchId }) => {
    const existingUser = await selectUserById(id);

    if (!existingUser)
        throw new AppError("Usuário não encontrado", 400);

    if (!name || !email || !cpf || !roleId)
        throw new AppError("Preencha os campos corretamente", 400);

    return await updateUser(id, name, email, cpf, roleId, branchId);
};

export const removeUserService = async (id) => {
    const existingUser = await selectUserById(id);

    if (!existingUser)
        throw new AppError("Usuário não encontrado", 400);

    return await deleteUser(id);
};

export const updateProfileService = async ({ id, name, password }) => {
    const existingUser = await selectUserById(id);

    if (!existingUser)
        throw new AppError("Usuário não encontrado", 400);

    if (name) {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        if (!nameRegex.test(name))
            throw new AppError("O nome só pode conter letras e espaços", 400);
        if (name.length > 50)
            throw new AppError("O nome excede o limite permitido", 400);
    }

    let hashedPassword = existingUser.password;
    if (password) {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!strongRegex.test(password))
            throw new AppError("Senha fraca", 400);

        hashedPassword = await bcrypt.hash(password, 10);
    }

    const newName = name || existingUser.name;

    await updateUserProfile(id, newName, hashedPassword);

    return { message: "Perfil atualizado com sucesso!" };
};