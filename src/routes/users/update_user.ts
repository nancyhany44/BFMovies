import express from 'express';
import { validate as isUUID } from 'uuid';
import { UserService } from '../../Service-layer/UserService';
const router = express.Router();

router.put('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { username, name, email, password } = req.body;

  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  try {
    await UserService.updateUser(user_id, username, name, email, password);
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({
      message: 'Error',
    });
  }
});

export { router as updateUserRouter };
