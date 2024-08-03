<<<<<<< Updated upstream
import { Pool, PoolClient, QueryResult } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables from .env file
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function fetchData(): Promise<void> {
    let client: PoolClient | undefined;
  
    try {
      client = await pool.connect();
      try {
        const res: QueryResult = await client.query('SELECT * FROM users');
        console.log('Connected to PostgreSQL:', res.rows);
      } catch (queryError) {
        console.error('Error executing query', (queryError as Error).stack);
      } finally {
        client.release();
      }
    } catch (connectionError) {
      console.error('Error connecting to database', (connectionError as Error).stack);
    }
  }
  
  fetchData();
=======
import {createConnection } from "typeorm";
import { Client } from "./entities/Client";
import { Role } from "./entities/Role";
import express from "express";
import { createClientRouter } from "./routes/create_user";
import { createRoleRouter } from "./routes/create_role";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchUsersRouter } from "./routes/fetch_users";

const app = express();
const main = async() =>{
    try{
    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "",
        database: "bfmovies",
        entities: [Client, Role],
        synchronize: true
       

    })
    app.use(express.json());
    app.use(createClientRouter);
    app.use(createRoleRouter);
    app.use(deleteClientRouter);
    app.use(fetchUsersRouter);
    app.listen(3000, ()=>{
    });
}catch(error){
}
}

main();
>>>>>>> Stashed changes
