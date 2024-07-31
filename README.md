# BFMovies
steps:
1. npm install
2. create (database.json)
this will contain 
{
  "dev": {
    "driver": "pg",
    "user": "postgres",
    "password": "<YOUR_PASSWORD>",
    "host": "localhost",
    "database": "bfmovies"
  }
}
3. npx db-migrate up 
4. use 20240731124146-fix-migration.js to insert new user, delete new user.
5. apply new: npx db-migrate up, redo: npx db-migrate down
6. Insert data by writing SQL insert statments in the migration files 
or manually through a PostgreSQL 

to reset migrations npx db-migrate reset
to create  npx db-migrate create (name without brackets)
to select * from 
npm run dev