import express from "express"
import { Users } from "../entities/Users";
import { Role } from "../entities/Role";
import { RoleEnum,Constants } from "../enums/RoleEnum";
import { validate as isUUID } from "uuid";

const router = express.Router();

router.post("/api/users/:user_id/role", async(req,res)=>{
    const user_id = req.params.user_id;
    const {role} = req.body;
    if (!isUUID(user_id)) {
        return res.json({ message: "Error" });
    }
    if (!role) {
        return res.status(400).json({
            message: "Error"
        });
    }
    
    if (!Object.values(RoleEnum).includes(role)) {
        return res.json(
            { message: "Error" 
            });
    }
    const user = await Users.findOne({ where: { user_id } });
    if (!user) {
         return res.json({ 
            message: "Error"
         });
     }
     let roleEntity = await Role.findOne({ where: { role } });
       
        if (!roleEntity) {
            roleEntity = Role.create({ role });
            await roleEntity.save();
        }

        user.role = roleEntity;
        await user.save();
        return res.json({ 
            message: "DONE"
      });
    
})

export {router as createRoleRouter}




