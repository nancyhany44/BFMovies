import express from 'express';
import { validate as isUUID } from 'uuid';
import { RoleService } from '../../Service-layer/RoleService';
const router = express.Router();

router.put('/api/role/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: 'Error' });
  }
  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  try {
    await RoleService.updateRoleForUser(user_id, role);
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
});

export { router as updateRoleRouter };
