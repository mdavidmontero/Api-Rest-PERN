import express from "express";
import router from "./router";

const server = express();

server.use("/products", router);

export default server;
