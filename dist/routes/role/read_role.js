"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRoleRouter = void 0;
const express_1 = __importDefault(require("express"));
const RoleService_1 = require("../../Service-layer/RoleService");
const router = express_1.default.Router();
exports.fetchRoleRouter = router;
router.get('/api/role', async (req, res) => {
    try {
        const roles = await RoleService_1.RoleService.viewRoles();
        return res.json({ roles });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error' });
    }
});
