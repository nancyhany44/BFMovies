import express from 'express';
import cors from 'cors';
import { UserService } from '../Service-layer/UserService';
import { ValidationError, NotFoundError } from '../errors/Errors';

const router = express.Router();
const app = express();
const port = process.env.API_PORT || 4444;

// Middleware
app.use(express.json());
app.use(cors());

// Register API endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const { user, token } = await UserService.createUser(username, name, email, password);
    
    return res.status(200).json({
      message: 'OK',
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error: error.message,
    });
  }
});

// Login API endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await UserService.loginUser(email, password);
    res.status(200).send({ user, token });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      res.status(401).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
});

// Other endpoints can be added here

// Export the router
export { router as authRouter };
