import { createUser } from "../models/userModel.js";

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