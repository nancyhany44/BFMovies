import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../entities/Users';

const router = express.Router();

const validateEmail = (email: string) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  return emailRegex.test(email);
};

router.post('/register', async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body;

  // Input validation
  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const userRepository = getRepository(Users);

    // Check if username already exists
    const userNameExists = await userRepository.findOne({ where: { username } });
    if (userNameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = userRepository.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.user_id, username: newUser.username },
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as authRoutes };
