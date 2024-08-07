"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../../Service-layer/UserService");
const router = express_1.default.Router();
exports.fetchUsersRouter = router;
router.get('/api/users', async (req, res) => {
    try {
        const users = await UserService_1.UserService.ViewAllUsers();
        return res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error',
        });
    }
});
