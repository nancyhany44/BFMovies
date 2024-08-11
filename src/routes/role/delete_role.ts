import express from 'express';
import { validate as isUUID } from 'uuid';
import { RoleService } from '../../Service-layer/RoleService';
const router = express.Router();

router.delete('/api/role/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  try {
    await RoleService.deleteRoleForUser(user_id);

    return res.status(200).json({
      message: 'Done',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error',
    });
  }
});

export { router as deleteRoleRouter };
