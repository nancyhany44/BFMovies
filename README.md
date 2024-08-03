# BFMovies
<<<<<<< Updated upstream
steps:
1. npm install
2. create (database.json)
this will contain 
=======

steps
1. npm install
2. add the database.json
how by adding the below
>>>>>>> Stashed changes
{
  "dev": {
    "driver": "pg",
    "user": "postgres",
<<<<<<< Updated upstream
    "password": "<YOUR_PASSWORD>",
=======
    "password": <password>,
>>>>>>> Stashed changes
    "host": "localhost",
    "database": "bfmovies"
  }
}
<<<<<<< Updated upstream
3. npx db-migrate up 
4. use 20240731124146-fix-migration.js to insert new user, delete new user.
5. apply new: npx db-migrate up, redo: npx db-migrate down
6. Insert data by writing SQL insert statments in the migration files 
or manually through a PostgreSQL 

to reset migrations npx db-migrate reset
to create  npx db-migrate create (name without brackets)
to select * from 
npm run dev
=======

3. to genertae migration 
  npm run typeorm migration:generate -- -d src/data-source.ts src/migration/name //(put whatever name you want instead of word name)

4. To apply: npm run migration:run  // meaning insert or update according to the sql query
5. To revert back: npm run migration:revert // revert the prev step
7. Also add .env file that contain the below data 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bfmovies
DB_USER=user
DB_PASSWORD=<password>
8. NOTE: must create db names bfmovies then run migration files like above steps
>>>>>>> Stashed changes
