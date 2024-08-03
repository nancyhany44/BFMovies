import express from "express"
import { Role, RoleTypes } from "../entities/Role";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:user_id/role", async(req,res)=>{
    const user_id = parseInt(req.params.user_id, 10);
    const {role} = req.body
    if (!Object.values(RoleTypes).includes(role)) {
        return res.json(
            { message: "Error" 
            });
    }
    const client = await Client.findOne({ where: { user_id } });
     if (!client) {
         return res.json({ 
            message: "Error"
         });
     }
     let roleEntity = await Role.findOne({ where: { role } });
       
        if (!roleEntity) {
            roleEntity = Role.create({ role });
            await roleEntity.save();
        }
client.role = roleEntity;
await client.save();
return res.json({ 
    message: "DONE"
      });

})

export {router as createRoleRouter}






