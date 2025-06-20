import express from "express";
import cors from "cors";
import db from "./db/conn.js";
import userRouter from "./routes/userRoutes.js";
import branchRouter from "./routes/branchRoutes.js";
import vehicleRouter from "./routes/vehicleRoutes.js";
import sellHistoryRouter from "./routes/sellHistoryRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/branches", branchRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/sell", sellHistoryRouter);

app.get("/", (req, res) => {
    res.send("Api funcionando!");
});

db.query(`USE db_auto_branch`, (err) => {
    if (err)
      console.error("Erro ao conectar ao banco de dados:", err);
    console.log("Conectado ao banco de dados");
  });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});