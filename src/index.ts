import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import reservasRouter from "./routes/reservas.routes";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/reservas", reservasRouter);

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de reservas funcionando" });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Error de conexión:", error));
