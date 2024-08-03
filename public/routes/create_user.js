"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entities/Client");
const router = express_1.default.Router();
exports.createClientRouter = router;
router.post('/api/client', async (req, res) => {
    const { user_id, username, name, password } = req.body;
    const clientFind = await Client_1.Client.findOne({ where: { user_id } });
    const clientFind1 = await Client_1.Client.findOne({ where: { username } });
    if (clientFind1) {
        return res.json({
            message: " Error"
        });
    }
    if (!clientFind) { //check input sanitization
        const client = Client_1.Client.create({
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
    else {
        return res.json({
            message: " Error"
        });
    }
});
