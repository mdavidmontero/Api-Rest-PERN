import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
  // logging: false, //para test
});

export default db;
