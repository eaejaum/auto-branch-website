import db from "../db/conn.js";

export const selectAllBranches = async () => {
    try {
        const query = `SELECT
                        b.id,
                        b.name,
                        b.city,
                        b.state,
                        b.cep,
                        b.phoneNumber,
                        b.managerId,
                        m.id AS manager_id,
                        m.name AS manager_name,
                        m.cpf AS manager_cpf,
                        m.roleId AS manager_roleId
                       FROM branches b
                       JOIN users m ON b.managerId = m.id;`;
        const [results] = await db.promise().query(query);
        const formatted = results.map(row => ({
            id: row.id,
            name: row.name,
            city: row.city,
            state: row.state,
            cep: row.cep,
            phoneNumber: row.phoneNumber,
            managerId: row.managerId,
            manager: {
                id: row.manager_id,
                name: row.manager_name,
                cpf: row.manager_cpf,
                roleId: row.manager_roleId
            }
        }));

        return formatted;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const selectBranchById = async (id) => {
    try {
        const query = `SELECT
                        b.id,
                        b.name,
                        b.city,
                        b.state,
                        b.cep,
                        b.phoneNumber,
                        b.managerId,
                        m.id AS manager_id,
                        m.name AS manager_name,
                        m.cpf AS manager_cpf,
                        m.roleId AS manager_roleId
                       FROM branches b
                       JOIN users m ON b.managerId = m.id
                       WHERE b.id = ?;`;
        const [results] = await db.promise().query(query, [id]);
        const formatted = results.map(row => ({
            id: row.id,
            name: row.name,
            city: row.city,
            state: row.state,
            cep: row.cep,
            phoneNumber: row.phoneNumber,
            managerId: row.managerId,
            manager: {
                id: row.manager_id,
                name: row.manager_name,
                cpf: row.manager_cpf,
                roleId: row.manager_roleId
            }
        }));

        return formatted.length > 0 ? formatted[0] : null;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const insertBranch = async (name, city, state, cep, phoneNumber, managerId) => {
    try {
        const query = `INSERT INTO branches (name, city, state, cep, phoneNumber, managerId) VALUES (?, ?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, city, state, cep, phoneNumber, managerId]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir no banco de dados");
    }
};

export const updateBranch = async (id, name, city, state, cep, phoneNumber, managerId) => {
    try {
        const query = `UPDATE branches SET name = ?, city = ?, state = ?, cep = ?, phoneNumber = ?, managerId = ?, WHERE id = ?`;
        const [results] = await db.promise().query(query, [name, city, state, cep, phoneNumber, managerId, id]);

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