import express from "express";
import { Users } from "../entities/Users";

const router = express.Router();

router.get('/api/users', async(req,res) =>{
    const users = await Users.find();
    const filteredUsers = users.map(user => ({
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }));

    return res.json({ users: filteredUsers });

})

export {router as fetchUsersRouter}
