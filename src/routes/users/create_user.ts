import express from 'express';
import { UserService } from '../../Service-layer/UserService';
const router = express.Router();

router.post('/api/users', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    await UserService.createUser(username, name, email, password);

    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
    });
  }
});

export { router as createClientRouter };
