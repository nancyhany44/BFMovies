"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const UserService_1 = require("../../Service-layer/UserService");
const router = express_1.default.Router();
exports.deleteClientRouter = router;
router.delete('/api/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    if (!(0, uuid_1.validate)(user_id)) {
        return res.json({ message: 'Error' });
    }
    try {
        await UserService_1.UserService.deleteUser(user_id);
        return res.status(200).json({
            message: 'Done',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error',
        });
    }
});
