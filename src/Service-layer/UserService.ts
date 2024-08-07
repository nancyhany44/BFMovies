import { Users } from '../entities/Users';
import {
  NotFoundError,
  DeletionError,
  ValidationError,
} from '../errors/Errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


const SECRET_KEY = '35cdf753a36e4025830b5324ac0511bef368b6cccb72fa5adde941fccbea3157bdafaa99f1809b40efa659d9b24ef25013e8e1964f34a172f2f4d0612d86466c07f3875c24571ae528cf747894cfb18d030737e47b922057935e4f7f84c1fb0ef08aac304b0be8393ff1921d7ee52454e0e887fdbc956d9074666fa05fa5a54b6048d92b5a3e70de602317e2f3861c0c7d4bab38bd3c83eaa3dd9d1db9a61674c033efc2bfa3b77419957daf8da82d41601586ba7618ca0a4ced61e04e32035cd56b69e412cfdc1c7635179ad6516ba0d13e7da61f9417ce0dca9494d83732fd504e8d580fab9e57991872fa35a82f3d28e943ff0a70aa6c7d9a9e5e44e3697d'; // Replace with your actual secret key


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


  static async createUser(username: string, name: string, email: string, password: string) {
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


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const user = Users.create({
      username,
      name,
      email,
      password: hashedPassword,
    });


    await user.save();


    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' });


    console.log('JWT:', token);


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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
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


  static async loginUser(email: string, userPlainPassword: string) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundError('User not found');
      }


      // Compare the hashed password with the plain text password
      const isMatch = await bcrypt.compare(userPlainPassword, user.password);
      console.log(`User found: ${user.username}`);
      console.log(`Entered password: ${userPlainPassword}`);
      console.log(`Stored hashed password: ${user.password}`);
      console.log("Password Match:", isMatch);


      if (!isMatch) {
        throw new ValidationError('Invalid password');
      }


      const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' });
      return { user, token };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}


