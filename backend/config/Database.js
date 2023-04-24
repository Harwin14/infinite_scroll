import { Sequelize } from "sequelize";

const db = new Sequelize("infinite_db", "harwin", "153426@Asu", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
