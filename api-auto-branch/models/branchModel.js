import db from "../db/conn.js";

export const selectAllBranches = async () => {
    try {
        const query = `SELECT * FROM branches`;
        const [results] = await db.promise().query(query);

        return results;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const selectBranchById = async (id) => {
    try {
        const query = `SELECT * FROM branches WHERE id = ?`;
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const insertBranch = async (name, city, state, cep, phoneNumber) => {
    try {
        const query = `INSERT INTO branches (name, city, state, cep, phoneNumber) VALUES (?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, city, state, cep, phoneNumber]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir no banco de dados");
    }
};

export const updateBranch = async (id, name, city, state, cep, phoneNumber) => {
    try {
        const query = `UPDATE branches SET name = ?, city = ?, state = ?, cep = ?, phoneNumber = ? WHERE id = ?`;
        const [results] = await db.promise().query(query, [name, city, state, cep, phoneNumber, id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao editar no banco de dados");
    }
};

export const deleteBranch = async (id) => {
    try {
        const query = `DELETE FROM branches WHERE id = ?`
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao deletar no banco de dados");
    }
};