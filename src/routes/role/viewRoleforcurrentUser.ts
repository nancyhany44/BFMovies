import express from 'express';
import { RoleService } from '../../Service-layer/RoleService';
import { validate as isUUID } from 'uuid';

const router = express.Router();

router.get('/api/role/:user_id', async (req, res) => {
  const { user_id } = req.params;
  if (!isUUID(user_id)) {
    return res.status(400).json({ message: 'Error' });
  }
  try {
    const roles = await RoleService.viewRoleOfCurrentUser(user_id);
    return res.json({ roles });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
});

export { router as fetchUserByID };
