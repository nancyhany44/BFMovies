"use strict";
<<<<<<< Updated upstream
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables from .env file
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
pool.connect()
    .then((client) => {
    return client.query('SELECT NOW()')
        .then((res) => {
        console.log('Connected to PostgreSQL:', res.rows[0]);
        client.release(); // Release the client back to the pool
    })
        .catch((err) => {
        client.release(); // Release the client back to the pool in case of an error
        console.error('Error executing query', err.stack);
    });
})
    .catch((err) => console.error('Error connecting to database', err.stack));
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Client_1 = require("./entities/Client");
const Role_1 = require("./entities/Role");
const express_1 = __importDefault(require("express"));
const create_user_1 = require("./routes/create_user");
const create_role_1 = require("./routes/create_role");
const delete_client_1 = require("./routes/delete_client");
const fetch_users_1 = require("./routes/fetch_users");
const app = (0, express_1.default)();
const main = async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "",
            database: "bfmovies",
            entities: [Client_1.Client, Role_1.Role],
            synchronize: true
        });
        app.use(express_1.default.json());
        app.use(create_user_1.createClientRouter);
        app.use(create_role_1.createRoleRouter);
        app.use(delete_client_1.deleteClientRouter);
        app.use(fetch_users_1.fetchUsersRouter);
        app.listen(3000, () => {
        });
    }
    catch (error) {
    }
};
main();
>>>>>>> Stashed changes
