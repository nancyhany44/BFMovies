import express from 'express';
import { createClientRouter } from './routes/create_user';
import { createRoleRouter } from './routes/create_role';
import { deleteClientRouter } from './routes/delete_user';
import { fetchUsersRouter } from './routes/fetch_users';
import { AppDataSource } from './data-source';
import { updateUserRouter } from './routes/update_user';
const app = express();
const main = async () => {
  await AppDataSource.initialize();
  app.use(express.json());
  app.use(createClientRouter);
  app.use(createRoleRouter);
  app.use(deleteClientRouter);
  app.use(fetchUsersRouter);
  app.use(updateUserRouter);
  app.listen(3000, () => {});
};
main();
