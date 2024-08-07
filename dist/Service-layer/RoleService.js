"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const Users_1 = require("../entities/Users");
const Role_1 = require("../entities/Role");
const RoleEnum_1 = require("../enums/RoleEnum");
const Errors_1 = require("../errors/Errors");
class RoleService {
    static async createRoleForUser(user_id, role) {
        if (!Object.values(RoleEnum_1.RoleEnum).includes(role)) {
            throw new Errors_1.ValidationError('Invalid');
        }
        const user = await Users_1.Users.findOne({
            where: { user_id },
            relations: ['role'],
        });
        if (!user) {
            throw new Errors_1.NotFoundError('Error');
        }
        if (user.role && user.role.role_id !== null) {
            throw new Errors_1.ValidationError('Invalid for this');
        }
        const roleEntity = await Role_1.Role.findOne({ where: { role } });
        if (!roleEntity) {
            throw new Errors_1.ValidationError('Invalid');
        }
        user.role = roleEntity;
        await user.save();
    }
    static async viewRoles() {
        const roles = await Role_1.Role.find();
        if (roles.length === 0) {
            throw new Errors_1.NotFoundError('Error');
        }
        const filteredRoles = roles.map((roleEntity) => ({
            role_id: roleEntity.role_id, // Assuming role_id exists on Role entity
            role: roleEntity.role, // Assuming role exists on Role entity
        }));
        return filteredRoles;
    }
    static async updateRoleForUser(user_id, newRole) {
        if (!Object.values(RoleEnum_1.RoleEnum).includes(newRole)) {
            throw new Errors_1.ValidationError('Invalid');
        }
        const user = await Users_1.Users.findOne({
            where: { user_id },
            relations: ['role'],
        });
        if (!user) {
            throw new Errors_1.NotFoundError('Error');
        }
        if (!user.role) {
            throw new Errors_1.ValidationError('User does not have an existing role to update.');
        }
        if (user.role.role === newRole) {
            throw new Errors_1.NotFoundError('Error');
        }
        if (user.role && user.role.role_id !== null && user.role.role !== newRole) {
            const roleEntity = await Role_1.Role.findOne({ where: { role: newRole } });
            if (!roleEntity) {
                throw new Errors_1.ValidationError('Invalid role.');
            }
            user.role = roleEntity;
            await user.save();
        }
        else if (!user.role || user.role.role_id === null) {
            throw new Errors_1.ValidationError('User does not have an existing role to update.');
        }
    }
    static async deleteRoleForUser(user_id) {
        const user = await Users_1.Users.findOne({
            where: { user_id },
            relations: ['role'],
        });
        if (!user) {
            throw new Errors_1.NotFoundError('Error');
        }
        if (!user.role) {
            throw new Errors_1.DeletionError('Error found');
        }
        user.role = null;
        await user.save();
    }
    static async viewRoleOfCurrentUser(user_id) {
        const user = await Users_1.Users.findOne({
            where: { user_id },
            relations: ['role'],
        });
        if (!user) {
            throw new Errors_1.NotFoundError('User not found');
        }
        if (!user.role) {
            throw new Errors_1.NotFoundError('No role assigned to this user');
        }
        const filteredRole = {
            role_id: user.role.role_id,
            role: user.role.role,
        };
        return filteredRole;
    }
}
exports.RoleService = RoleService;
