import express from 'express';
import { AppDataSource } from './data-source';
import { authRoutes } from './routes/authRoutes';
import { createRoleRouter } from './routes/create_role';
import { deleteClientRouter } from './routes/delete_user';
import { fetchUsersRouter } from './routes/fetch_users';
import { updateUserRouter } from './routes/update_user';
import { createClientRouter } from './routes/users/create_user';

const app = express();

const main = async () => {
  await AppDataSource.initialize();
  app.use(express.json());
  app.use(createClientRouter);
  app.use(createRoleRouter);
  app.use(deleteClientRouter);
  app.use(fetchUsersRouter);
  app.use(updateUserRouter);
  // app.use(authRoutes); 
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
};

main();
