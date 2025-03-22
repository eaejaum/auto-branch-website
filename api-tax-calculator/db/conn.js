import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_tax_calculator"
});

db.connect((err) => {
    if(err)
        console.log(err);
    console.log("Conectado ao banco de dados!");
});

export default db;