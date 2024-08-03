"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoleRouter = void 0;
const express_1 = __importDefault(require("express"));
const Role_1 = require("../entities/Role");
const Client_1 = require("../entities/Client");
const router = express_1.default.Router();
exports.createRoleRouter = router;
router.post("/api/client/:user_id/role", async (req, res) => {
    const user_id = parseInt(req.params.user_id, 10);
    const { role } = req.body;
    if (!Object.values(Role_1.RoleTypes).includes(role)) {
        return res.json({ message: "Error"
        });
    }
    const client = await Client_1.Client.findOne({ where: { user_id } });
    if (!client) {
        return res.json({
            message: "Error"
        });
    }
    let roleEntity = await Role_1.Role.findOne({ where: { role } });
    if (!roleEntity) {
        roleEntity = Role_1.Role.create({ role });
        await roleEntity.save();
    }
    client.role = roleEntity;
    await client.save();
    return res.json({
        message: "DONE"
    });
});
