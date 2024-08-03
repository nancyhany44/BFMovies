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
