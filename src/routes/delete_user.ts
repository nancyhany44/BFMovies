import express from "express";
import { Users } from "../entities/Users";
import { validate as isUUID } from "uuid";

const router= express.Router();

router.delete("/api/users/:user_id", async(req,res)=>{
    const {user_id} = req.params;

    if (!isUUID(user_id)) {
        return res.json(
            { message: "Error" });
    }
    const response = await Users.delete(user_id);
    if (response.affected === 0) {
        return res.json(
            { message: "Error" });
    }

    return res.json({
        message: "Done"
});
})

export { router as deleteClientRouter};