import db from "../db/conn.js";

export const selectAllUsers = async () => {
    try {
        const query = `SELECT * FROM users`;
        const [results] = await db.promise().query(query);

        return results;
    } catch (err) {
        throw new Error("Erro ao listar usuários no banco de dados");
    }
};

export const selectUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`
        const [results] = await db.promise().query(query, [email]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao selecionar usuário no banco de dados");
    }
};

export const selectUserById = async (id) => {
    try {
        const query = `SELECT * FROM  users WHERE id = ?`
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao selecionar usuário no banco de dados");
    }
};

export const insertUser = async (name, email, cpf, password, roleId) => {
    try {
        const query = `INSERT INTO users (name, email, cpf, password, roleId) VALUES (?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, email, cpf, password, roleId]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir usuário no banco de dados");
    }
};

export const updateUser = async (id, name, email, cpf, roleId) => {
    try {
        const query = `UPDATE users SET name = ?, email = ?, cpf = ?, roleId = ? WHERE id = ?`;
        const [results] = await db.promise().query(query, [name, email, cpf, roleId, id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao editar usuário no banco de dados");
    }
};

export const deleteUser = async (id) => {
    try {
        const query = `DELETE FROM users WHERE id = ?`;
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao deletar usuário no banco de dados");
    }
};