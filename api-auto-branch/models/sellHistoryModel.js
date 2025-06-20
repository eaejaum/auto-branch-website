import db from "../db/conn.js";

export const sellVehicleModel = async (vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice) => {
    try {
        const insertQuery = `INSERT INTO sellHistory (vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice) VALUES (?, ?, ?, ?, ?, ?)`;
        await db.promise().query(insertQuery, [vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice]);

        const updateQuery = `UPDATE vehicles SET status = 2 WHERE id = ?`;
        await db.promise().query(updateQuery, [vehicleId]);

        return { message: "Veículo vendido com sucesso!" };
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao vender veiculo no banco de dados");
    }
};

export const selectAllSalesHistory = async () => {
    try {
        const selectQuery = `SELECT
                                s.id,
                                s.sellPrice,
                                s.discountPercent,
                                s.totalPrice,
                                s.vehicleId,

                                v.id AS vehicle_id,
                                v.brand AS vehicle_brand,
                                v.model AS vehicle_model,
                                v.version AS vehicle_version,
                                v.plate AS vehicle_plate,

                                u.id AS user_id,
                                u.name AS user_name,
                                u.email AS user_email,

                                b.id AS branch_id,
                                b.name AS branch_name,
                                b.city AS branch_city,
                                b.state AS branch_state

                            FROM sellHistory s
                            LEFT JOIN vehicles v ON s.vehicleId = v.id
                            LEFT JOIN users u ON s.userId = u.id
                            LEFT JOIN branches b ON s.branchId = b.id;`;
        const [results] = await db.promise().query(selectQuery);
        const formatted = results.map(row => ({
            id: row.id,
            sellPrice: row.sellPrice,
            discountPercent: row.discountPercent,
            totalPrice: row.totalPrice,
            vehicleId: row.vehicleId,
            vehicle: {
                id: row.vehicle_id,
                brand: row.vehicle_brand,
                model: row.vehicle_model,
                version: row.vehicle_version,
                plate: row.vehicle_plate,
            },
            userId: row.user_id,
            user: {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
            },
            branchId: row.branch_id,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
            }
        }));

        return formatted;
    } catch (err) {
        throw new Error("Erro ao listar histórico no banco de dados");
    }
};

export const selectAllSalesHistoryByBranchId = async (branchId) => {
    try {
        const selectQuery = `SELECT
                                s.id,
                                s.sellPrice,
                                s.discountPercent,
                                s.totalPrice,
                                s.vehicleId,

                                v.id AS vehicle_id,
                                v.brand AS vehicle_brand,
                                v.model AS vehicle_model,
                                v.version AS vehicle_version,
                                v.plate AS vehicle_plate,

                                u.id AS user_id,
                                u.name AS user_name,
                                u.email AS user_email,

                                b.id AS branch_id,
                                b.name AS branch_name,
                                b.city AS branch_city,
                                b.state AS branch_state

                            FROM sellHistory s
                            LEFT JOIN vehicles v ON s.vehicleId = v.id
                            LEFT JOIN users u ON s.userId = u.id
                            LEFT JOIN branches b ON s.branchId = b.id
                            WHERE s.branchId = ?;`;
        const [results] = await db.promise().query(selectQuery, [branchId]);
        const formatted = results.map(row => ({
            id: row.id,
            sellPrice: row.sellPrice,
            discountPercent: row.discountPercent,
            totalPrice: row.totalPrice,
            vehicleId: row.vehicleId,
            vehicle: {
                id: row.vehicle_id,
                brand: row.vehicle_brand,
                model: row.vehicle_model,
                version: row.vehicle_version,
                plate: row.vehicle_plate,
            },
            userId: row.user_id,
            user: {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
            },
            branchId: row.branch_id,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
            }
        }));

        return formatted;
    } catch (err) {
        throw new Error("Erro ao listar histórico no banco de dados");
    }
};