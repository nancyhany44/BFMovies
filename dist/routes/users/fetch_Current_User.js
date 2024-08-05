"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCurentUserByID = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../../Service-layer/UserService");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
exports.fetchCurentUserByID = router;
router.get('/api/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    if (!(0, uuid_1.validate)(user_id)) {
        return res.status(400).json({ message: 'Error' });
    }
    try {
        const user = await UserService_1.UserService.viewUserOfCurrentUser(user_id);
        return res.json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error' });
    }
});
