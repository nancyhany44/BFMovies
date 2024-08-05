"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserByID = void 0;
const express_1 = __importDefault(require("express"));
const RoleService_1 = require("../../Service-layer/RoleService");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
exports.fetchUserByID = router;
router.get('/api/role/:user_id', async (req, res) => {
    const { user_id } = req.params;
    if (!(0, uuid_1.validate)(user_id)) {
        return res.status(400).json({ message: 'Error' });
    }
    try {
        const roles = await RoleService_1.RoleService.viewRoleOfCurrentUser(user_id);
        return res.json({ roles });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error' });
    }
});
