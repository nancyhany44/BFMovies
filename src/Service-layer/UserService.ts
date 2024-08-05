import { Users } from '../entities/Users';
import {
  NotFoundError,
  DeletionError,
  ValidationError,
} from '../errors/Errors';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'be610a5244a1f6b8d9e53040a918a6116157c48b14f1805a71d37cf78d667a417514d742c28bba70e31d2e883ed749b45e0a7417f9ceddbbe2afa0a46fb72b43ad3b4702e4fd2e700c7d9433890336fe8a52d67e3ebd71f56f319b9d57f544c80e89796410181b899920bd8fe1e3a73ecb531bad385f1b4c23745efb3e65d81d551319eb7d88c075b0dda66227fe587ebcd32ff0449dab86d3796430adb4fd29f6ed15e972e1b68156e1ec8f42ad7dc6109cc983c1aecec05a281a226bc7f5906d9972e7b3edd687188f978e8324a53f8b6c37c4b12e8ee2e91c98aca59dd0043a7e3d7c216ff494db71f5deadf2b8f1f8ffde57d7d68da551c24ec4a6d7e5be'; // Replace with your actual secret key


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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = Users.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' });
    
    // Log the token for verification
    console.log('JWT:', token);
    
    // Verify the token immediately after creation
    const verifiedToken = UserService.verifyToken(token);
    console.log('Verified Token:', verifiedToken);

    return { user, token };
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

  // Add a method to verify the JWT
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}




