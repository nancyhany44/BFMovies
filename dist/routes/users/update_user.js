"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const UserService_1 = require("../../Service-layer/UserService");
const router = express_1.default.Router();
exports.updateUserRouter = router;
router.put('/api/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { username, name, email, password } = req.body;
    if (!(0, uuid_1.validate)(user_id)) {
        return res.status(400).json({ message: 'Error' });
    }
    try {
        await UserService_1.UserService.updateUser(user_id, username, name, email, password);
        return res.status(200).json({ message: 'OK' });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error',
        });
    }
});
