import express from "express";
import { Client } from "../entities/Client";

const router= express.Router();

router.delete("/api/client/:user_id", async(req,res)=>{
    const {user_id} = req.params;

    const response = await Client.delete(parseInt(user_id));

    return res.json({
        message: "Done"
});
})

export { router as deleteClientRouter};