import { createUserService, getAllUsersService, loginUserService, getUserByIdService, getUserByEmailService, editUserService, removeUserService, getAllManagersService, getAllUsersByBranchIdService, updateProfileService } from "../services/userService.js";

export const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    res.status(200).json({
      data: [user],
      message: "Login realizado com sucesso!"
      //token
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.body);
    res.status(200).json({
      data: users,
      message: "Usuários listados com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const getAllManagers = async (req, res) => {
  try {
    const managers = await getAllManagersService(req.body);
    res.status(200).json({
      data: managers,
      message: "Gerentes listados com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const getAllUsersByBranchId = async (req, res) => {
  const { id } = req.params

  try {
    const users = await getAllUsersByBranchIdService(id);
    res.status(200).json({
      data: users,
      message: "Usuários por concessionária listados com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await getUserByIdService(id);
    res.status(200).json({
      data: [user],
      message: "Usuário listado com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    await createUserService(req.body);
    res.status(201).json({
      message: "Usuário registrado com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    await editUserService(req.body);
    res.status(200).json({
      message: "Usuário editado com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    await removeUserService(id);
    res.status(200).json({
      message: "Usuário removido com sucesso!"
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const result = await updateProfileService(req.body);
    res.status(200).json({
      message: result.message,
    });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};