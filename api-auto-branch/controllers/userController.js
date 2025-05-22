import { createUserService, loginUserService } from "../services/userService.js";

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
