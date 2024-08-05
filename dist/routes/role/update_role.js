"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleRouter = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const RoleService_1 = require("../../Service-layer/RoleService");
const router = express_1.default.Router();
exports.updateRoleRouter = router;
router.put('/api/role/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;
    if (!role) {
        return res.status(400).json({ message: 'Error' });
    }
    if (!(0, uuid_1.validate)(user_id)) {
        return res.status(400).json({ message: 'Error' });
    }
    try {
        await RoleService_1.RoleService.updateRoleForUser(user_id, role);
        return res.status(200).json({ message: 'OK' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error' });
    }
});
