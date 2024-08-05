import express from 'express';
import { RoleService } from '../../Service-layer/RoleService';
const router = express.Router();

router.get('/api/role', async (req, res) => {
  try {
    const roles = await RoleService.viewRoles();
    return res.json({ roles });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
});

export { router as fetchRoleRouter };
