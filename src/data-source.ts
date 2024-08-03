import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { error } from "console";
import { Role } from "./entities/Role";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "", 
    database: "bfmovies",
    synchronize: false, 
    logging: false,
    entities: ["src/entities/**/*.ts"], 
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});


