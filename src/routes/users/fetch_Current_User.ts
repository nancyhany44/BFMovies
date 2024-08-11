import express from 'express';
import { UserService } from '../../Service-layer/UserService';
import { validate as isUUID } from 'uuid';

const router = express.Router();

router.get('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  try {
    const user = await UserService.viewUserOfCurrentUser(user_id);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
});

export { router as fetchCurentUserByID };
