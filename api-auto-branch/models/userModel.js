import db from "../db/conn.js";

export const insertUser = async (name, email, cpf, password, isAdmin) => {
    try {
        const query = `INSERT INTO users (name, email, cpf, password, is_admin) VALUES (?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, email, cpf, password, isAdmin]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir usuário no banco de dados");
    }
};

export const selectUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM  users WHERE email = ?`
        const [results] = await db.promise().query(query, [email]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao selecionar usuário no banco de dados");
    }
};