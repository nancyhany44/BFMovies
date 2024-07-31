"use strict";
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
