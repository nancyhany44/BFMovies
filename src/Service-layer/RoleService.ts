import { Users } from '../entities/Users';
import { Role } from '../entities/Role';
import { RoleEnum } from '../enums/RoleEnum';
import {
  NotFoundError,
  DeletionError,
  ValidationError,
} from '../errors/Errors';
export class RoleService {
  static async createRoleForUser(user_id: string, role: RoleEnum) {
    if (!Object.values(RoleEnum).includes(role)) {
      throw new ValidationError('Invalid');
    }

    const user = await Users.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundError('Error');
    }
    if (user.role && user.role.role_id !== null) {
      throw new ValidationError('Invalid for this');
    }

    const roleEntity = await Role.findOne({ where: { role } });

    if (!roleEntity) {
      throw new ValidationError('Invalid');
    }

    user.role = roleEntity;
    await user.save();
  }

  static async viewRoles() {
    const roles = await Role.find();
    if (roles.length === 0) {
      throw new NotFoundError('Error');
    }
    const filteredRoles = roles.map((roleEntity) => ({
      role_id: roleEntity.role_id, // Assuming role_id exists on Role entity
      role: roleEntity.role, // Assuming role exists on Role entity
    }));
    return filteredRoles;
  }

  static async updateRoleForUser(user_id: string, newRole: RoleEnum) {
    if (!Object.values(RoleEnum).includes(newRole)) {
      throw new ValidationError('Invalid');
    }
    const user = await Users.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundError('Error');
    }
    if (!user.role) {
      throw new ValidationError(
        'User does not have an existing role to update.'
      );
    }
    if (user.role.role === newRole) {
      throw new NotFoundError('Error');
    }
    if (user.role && user.role.role_id !== null && user.role.role !== newRole) {
      const roleEntity = await Role.findOne({ where: { role: newRole } });
      if (!roleEntity) {
        throw new ValidationError('Invalid role.');
      }

      user.role = roleEntity;
      await user.save();
    } else if (!user.role || user.role.role_id === null) {
      throw new ValidationError(
        'User does not have an existing role to update.'
      );
    }
  }

  static async deleteRoleForUser(user_id: string) {
    const user = await Users.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundError('Error');
    }

    if (!user.role) {
      throw new DeletionError('Error found');
    }

    user.role = null;
    await user.save();
  }
  static async viewRoleOfCurrentUser(user_id: string) {
    const user = await Users.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.role) {
      throw new NotFoundError('No role assigned to this user');
    }

    const filteredRole = {
      role_id: user.role.role_id,
      role: user.role.role,
    };
    return filteredRole;
  }
}
