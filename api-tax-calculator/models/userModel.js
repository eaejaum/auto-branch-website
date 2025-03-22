import bcrypt from 'bcrypt';
import db from "../db/conn.js";

export const createUser = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const [results] = await db.promise().query(query, [name, email, hashedPassword]);

        return results;
    } catch (err) {
        throw err;
    }
};