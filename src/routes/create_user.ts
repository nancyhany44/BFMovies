import express from "express"
import { Users } from "../entities/Users";
const router = express.Router();

router.post('/api/users', async(req,res)=>{
    const {username,name,email,password} = req.body;
    const userNameExists = await Users.findOne({ where: { username } });
        if (!username || !name || !email || !password) {
            return res.status(400).json({
                message: "Error"
            });
        }
    if (userNameExists){
        return res.json({
            message:" Error"
        })
    }
        //check input sanitization
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
        return res.json({
            message: "Error"
        });
    }
   const client = Users.create({
    username,
    name,
    email,
    password
   });
  

await client.save();
return res.json({
    message: "OK"
}); 
});

export {
    router as createClientRouter
}  

