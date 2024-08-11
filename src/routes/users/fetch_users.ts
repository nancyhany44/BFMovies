import express from 'express';
import { UserService } from '../../Service-layer/UserService';
const router = express.Router();

router.get('/api/users', async (req, res) => {
  try {
    const users = await UserService.ViewAllUsers();

    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: 'Error',
    });
  }
});

export { router as fetchUsersRouter };
