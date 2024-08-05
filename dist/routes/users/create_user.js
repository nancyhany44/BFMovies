"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../../Service-layer/UserService");
const router = express_1.default.Router();
exports.createClientRouter = router;
router.post('/api/users', async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        await UserService_1.UserService.createUser(username, name, email, password);
        return res.status(200).json({
            message: 'OK',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error',
        });
    }
});
