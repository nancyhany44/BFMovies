import express from 'express';
import { validate as isUUID } from 'uuid';
import { UserService } from '../../Service-layer/UserService';
const router = express.Router();

router.delete('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!isUUID(user_id)) {
    return res.json({ message: 'Error' });
  }
  try {
    await UserService.deleteUser(user_id);

    return res.status(200).json({
      message: 'Done',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error',
    });
  }
});

export { router as deleteClientRouter };
