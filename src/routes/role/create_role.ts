import express from 'express';
import { validate as isUUID } from 'uuid';
import { RoleService } from '../../Service-layer/RoleService';
const router = express.Router();
router.post('/api/role/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const { role } = req.body;
  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  if (!role) {
    return res.status(400).json({ message: 'Error' });
  }

  try {
    await RoleService.createRoleForUser(user_id, role);

    return res.status(200).json({
      message: 'DONE',
    });
  } catch (error) {
    return res.status(400).json({ message: 'Error' });
  }
});

export { router as createRoleRouter };
