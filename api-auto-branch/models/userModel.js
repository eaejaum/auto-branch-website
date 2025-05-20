import bcrypt from 'bcrypt';
import db from "../db/conn.js";

export const createUser = async (name, email, cpf, password, isAdmin) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email, cpf, password, is_admin) VALUES (?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, email, cpf, hashedPassword, isAdmin]);

        return results;
    } catch (err) {
        throw err;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM  users WHERE email = ?`
        const [results] = await db.promise().query(query, [email]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw err;
    }
};