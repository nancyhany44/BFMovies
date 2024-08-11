import { Router } from 'express';
import { getAllPeople } from '../Service-layer/swapiService';
const router = Router();
/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Retrieve a list of all Star Wars characters
 *     responses:
 *       200:
 *         description: A list of all Star Wars characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   height:
 *                     type: string
 *                   mass:
 *                     type: string
 *                   hair_color:
 *                     type: string
 *                   skin_color:
 *                     type: string
 *                   eye_color:
 *                     type: string
 *                   birth_year:
 *                     type: string
 *                   gender:
 *                     type: string
 */



router.get('/people',async (req,res) => {
    try{
        const people = await getAllPeople();
        res.json(people);
    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch films' });
      }
    });
export default router;
