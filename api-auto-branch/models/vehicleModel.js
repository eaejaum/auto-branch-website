import db from "../db/conn.js";

export const selectAllVehicles = async () => {
    try {
        const query = `SELECT 
                        v.id,
                        v.brand,
                        v.model,
                        v.version,
                        v.gearbox,
                        v.color,
                        v.motorization,
                        v.plate,
                        v.value,
                        v.branchId,
                        b.id AS branch_id,
                        b.name AS branch_name,
                        b.city AS branch_city,
                        b.state AS branch_state,
                        b.cep AS branch_cep,
                        b.phoneNumber AS branch_phone
                       FROM vehicles v
                       JOIN branches b ON v.branchId = b.id;`;
        const [results] = await db.promise().query(query);
        const formatted = results.map(row => ({
            id: row.id,
            brand: row.brand,
            model: row.model,
            version: row.version,
            gearbox: row.gearbox,
            color: row.color,
            motorization: row.motorization,
            plate: row.plate,
            value: row.value,
            branchId: row.branchId,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
                cep: row.branch_cep,
                phoneNumber: row.branch_phone
            }
        }));

        return formatted;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const selectVehicleById = async (id) => {
    try {
        const query = `SELECT 
                        v.id,
                        v.brand,
                        v.model,
                        v.version,
                        v.gearbox,
                        v.color,
                        v.motorization,
                        v.plate,
                        v.value,
                        v.branchId,
                        b.id AS branch_id,
                        b.name AS branch_name,
                        b.city AS branch_city,
                        b.state AS branch_state,
                        b.cep AS branch_cep,
                        b.phoneNumber AS branch_phone
                       FROM vehicles v
                       JOIN branches b ON v.branchId = b.id
                       WHERE v.id = ?`;
        const [results] = await db.promise().query(query, [id]);
        const formatted = results.map(row => ({
            id: row.id,
            brand: row.brand,
            model: row.model,
            version: row.version,
            gearbox: row.gearbox,
            color: row.color,
            motorization: row.motorization,
            plate: row.plate,
            value: row.value,
            branchId: row.branchId,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
                cep: row.branch_cep,
                phoneNumber: row.branch_phone
            }
        }));

        return formatted.length > 0 ? formatted[0] : null;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const insertVehicle = async (brand, model, version, gearbox, color, motorization, plate, value, branchId) => {
    try {
        const query = `INSERT INTO vehicles (brand, model, version, gearbox, color, motorization, plate, value, branchId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [brand, model, version, gearbox, color, motorization, plate, value, branchId]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir no banco de dados");
    }
};

export const updateVehicle = async (id, brand, model, version, gearbox, color, motorization, plate, value, branchId) => {
    try {
        const query = `UPDATE vehicles SET brand = ?, model = ?, version = ?, gearbox = ?, color = ?, motorization = ?, plate = ?, value = ?, branchId = ? WHERE id = ?`;
        const [results] = await db.promise().query(query, [brand, model, version, gearbox, color, motorization, plate, value, branchId, id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao editar no banco de dados");
    }
};

export const deleteVehicle = async (id) => {
    try {
        const query = `DELETE FROM vehicles WHERE id = ?`
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao deletar no banco de dados");
    }
};