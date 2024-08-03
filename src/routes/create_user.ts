import express from "express"
import { Client } from "../entities/Client";
const router = express.Router();

router.post('/api/client', async(req,res)=>{
    const {
        user_id,
        username,
        name,
        password
        
    } = req.body;
    const clientFind = await Client.findOne({ where: { user_id } });
    const clientFind1 = await Client.findOne({ where: { username } });

    if (clientFind1){
        return res.json({
            message:" Error"
        })
    }
    if(!clientFind){     //check input sanitization
        
   const client = Client.create({
    user_id,
    username,
    name,
    password
   });
  

await client.save();
return res.json({
    message: "OK"
});
    }
    else{
        return res.json({
            message:" Error"
        })
    }
});

export {
    router as createClientRouter
}  

