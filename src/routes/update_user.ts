import express from "express";
import { Users } from "../entities/Users";
import { validate as isUUID } from "uuid";
import * as bcrypt from "bcrypt";
const router= express.Router();

router.put("/api/users/:user_id", async(req,res)=>{
    const {user_id} = req.params;
    const {username, name, email,password}=req.body;
    if (!username && !name && !email && !password) {
        return res.json({
            message: "Error"
        });
    }
    if (!isUUID(user_id)) {
        return res.json(
            { message: "Error" });
    }
    const user = await Users.findOne({ where: { user_id } });
    if (!user) {
        return res.json({ message: "Error" });
    }

    if (username && username !== user.username) {
        const userNameExists = await Users.findOne({ where: { username } });
        if (userNameExists) {
            return res.json({
                 message: "Error"
                 });
        }
        user.username = username;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (email && !emailRegex.test(email)) {
        return res.json({ 
           message: "Error"
        });
    } else if (email) {
        user.email = email;
    }

    if (name) {
        user.name = name;
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return res.json({ message:"OK" 
    });

   

})

export { router as updateUserRouter};