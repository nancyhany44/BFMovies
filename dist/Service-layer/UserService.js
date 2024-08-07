"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Users_1 = require("../entities/Users");
const Errors_1 = require("../errors/Errors");
const bcrypt = __importStar(require("bcrypt"));
class UserService {
    static async ViewAllUsers() {
        const users = await Users_1.Users.find({ relations: ['role'] });
        if (users.length === 0) {
            throw new Errors_1.NotFoundError('Error');
        }
        const filteredUsers = users.map((user) => ({
            user_id: user.user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: {
                role_id: user.role?.role_id || null,
                role: user.role?.role || null,
            },
            created_at: user.created_at,
            updated_at: user.updated_at,
        }));
        return filteredUsers;
    }
    static async deleteUser(user_id) {
        const user = await Users_1.Users.findOne({ where: { user_id } });
        if (!user) {
            throw new Errors_1.NotFoundError('Error');
        }
        const response = await Users_1.Users.delete(user_id);
        if (response.affected === 0) {
            throw new Errors_1.DeletionError('Error found');
        }
        return response;
    }
    static async createUser(username, name, email, password) {
        if (!username || !name || !email || !password) {
            throw new Errors_1.NotFoundError('Error');
        }
        const userNameExists = await Users_1.Users.findOne({ where: { username } });
        if (userNameExists) {
            throw new Errors_1.ValidationError('Invalid');
        }
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            throw new Errors_1.ValidationError('Invalid');
        }
        const user = Users_1.Users.create({
            username,
            name,
            email,
            password,
        });
        await user.save();
        return;
    }
    static async updateUser(user_id, username, name, email, password) {
        if (!username && !name && !email && !password) {
            throw new Errors_1.ValidationError('Invalid');
        }
        const user = await Users_1.Users.findOne({ where: { user_id } });
        if (!user) {
            throw new Errors_1.NotFoundError('Error');
        }
        if (username && username !== user.username) {
            const userNameExists = await Users_1.Users.findOne({ where: { username } });
            if (userNameExists) {
                throw new Errors_1.ValidationError('Invalid');
            }
            user.username = username;
        }
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (email && !emailRegex.test(email)) {
            throw new Errors_1.ValidationError('Invalid');
        }
        else if (email) {
            user.email = email;
        }
        if (name) {
            user.name = name;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
    }
    static async viewUserOfCurrentUser(user_id) {
        const user = await Users_1.Users.findOne({
            where: { user_id },
            relations: ['role'],
        });
        if (!user) {
            throw new Errors_1.NotFoundError('User not found');
        }
        const filteredUser = {
            user_id: user.user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role ? user.role.role : null, // Include role only
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        return filteredUser;
    }
}
exports.UserService = UserService;
