import { Users } from '../entities/Users';
import {
  NotFoundError,
  DeletionError,
  ValidationError,
} from '../errors/Errors';
import * as bcrypt from 'bcrypt';
export class UserService {
  static async ViewAllUsers() {
    const users = await Users.find({ relations: ['role'] });
    if (users.length === 0) {
      throw new NotFoundError('Error');
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

  static async deleteUser(user_id: string) {
    const user = await Users.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundError('Error');
    }

    const response = await Users.delete(user_id);
    if (response.affected === 0) {
      throw new DeletionError('Error found');
    }

    return response;
  }

  static async createUser(
    username: string,
    name: string,
    email: string,
    password: string
  ) {
    if (!username || !name || !email || !password) {
      throw new NotFoundError('Error');
    }
    const userNameExists = await Users.findOne({ where: { username } });
    if (userNameExists) {
      throw new ValidationError('Invalid');
    }
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid');
    }
    const user = Users.create({
      username,
      name,
      email,
      password,
    });

    await user.save();
    return;
  }

  static async updateUser(
    user_id: string,
    username?: string,
    name?: string,
    email?: string,
    password?: string
  ) {
    if (!username && !name && !email && !password) {
      throw new ValidationError('Invalid');
    }
    const user = await Users.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundError('Error');
    }
    if (username && username !== user.username) {
      const userNameExists = await Users.findOne({ where: { username } });
      if (userNameExists) {
        throw new ValidationError('Invalid');
      }
      user.username = username;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (email && !emailRegex.test(email)) {
      throw new ValidationError('Invalid');
    } else if (email) {
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

  static async viewUserOfCurrentUser(user_id: string) {
    const user = await Users.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundError('User not found');
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
