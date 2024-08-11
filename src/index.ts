import express from 'express';
import { createClientRouter } from './routes/users/create_user';
import { createRoleRouter } from './routes/role/create_role';
import { deleteClientRouter } from './routes/users/delete_user';
import { fetchUsersRouter } from './routes/users/fetch_users';
import { AppDataSource } from './data-source';
import { updateUserRouter } from './routes/users/update_user';
import { fetchRoleRouter } from './routes/role/read_role';
import { updateRoleRouter } from './routes/role/update_role';
import { deleteRoleRouter } from './routes/role/delete_role';
import { fetchUserByID } from './routes/role/viewRoleforcurrentUser';
import { fetchCurentUserByID } from './routes/users/fetch_Current_User';
import { setupSwagger } from './swagger';
import movieRoutes from './routes/movies';
import peopleRouter from './routes/people';
import { importMoviesFromSwapi } from './Service-layer/swapiService';
import { importPeopleFromSwapi } from './Service-layer/swapiService';
import movieRoute from './routes/movies';

const app = express();
setupSwagger(app);
app.use(express.json());

app.use('/movies', movieRoute);
// app.use('/api', movieRoutes);
// app.use('/api', peopleRouter);

const main = async () => {
  await AppDataSource.initialize();
  app.use(express.json());
  app.use(createClientRouter);
  app.use(createRoleRouter);
  app.use(deleteClientRouter);
  app.use(fetchUsersRouter);
  app.use(updateUserRouter);
  app.use(fetchRoleRouter);
  app.use(updateRoleRouter);
  app.use(deleteRoleRouter);
  app.use(fetchUserByID);
  app.use(fetchCurentUserByID);
  //await importMoviesFromSwapi();
  // await importPeopleFromSwapi();
  app.listen(3000, () => {});
};
main();
