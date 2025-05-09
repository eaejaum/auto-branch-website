import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_auto_branch",
    port: 3306,
});

export default db;