import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router";
import db from "./config/db";
import colors from "colors";

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("Conexion exitosa a la DB"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la DB"));
  }
}
connectDB();
// Instancia de express
const server = express();
// Permitir Conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
server.use(cors(corsOptions));

server.use(morgan("dev"));
server.use(express.json());

server.use("/api/products", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde Api" });
});

export default server;
