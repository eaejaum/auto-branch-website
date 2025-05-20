import { createUser, getUserByEmail } from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Preencha todos os campos" });

  try {
    await createUser(name, email, password);
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if(!email || !password)
      return res.status(400).json({ message: "Preencha os campos corretamente" })

    const user = await getUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "E-mail ou senha incorretos" });

    // const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    //   expiresIn: "1h",
    // });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
        message: "Login realizado com sucesso!", 
        user: userWithoutPassword,
        // token
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao efetuar login" });
  }
};
