import express from 'express';
import { Users } from '../entities/Users';
import { validate as isUUID } from 'uuid';
import argon2 from 'argon2';

const router = express.Router();

router.put('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { username, name, email, password } = req.body;
  if (!username && !name && !email && !password) {
    return res.json({
      message: 'Error',
    });
  }
  if (!isUUID(user_id)) {
    return res.json({ message: 'Error' });
  }
  const user = await Users.findOne({ where: { user_id } });
  if (!user) {
    return res.json({ message: 'Error' });
  }

  if (username && username !== user.username) {
    const userNameExists = await Users.findOne({ where: { username } });
    if (userNameExists) {
      return res.json({
        message: 'Error',
      });
    }
    user.username = username;
  }

  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (email && !emailRegex.test(email)) {
    return res.json({
      message: 'Error',
    });
  } else if (email) {
    user.email = email;
  }

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = await argon2.hash(password);
  }

  await user.save();

  return res.json(user);
});

export { router as updateUserRouter };
