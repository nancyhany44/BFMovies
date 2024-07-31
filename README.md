# BFMovies

steps
1. npm install
2. add the database.json
how by adding the below
{
  "dev": {
    "driver": "pg",
    "user": "postgres",
    "password": <password>,
    "host": "localhost",
    "database": "bfmovies"
  }
}

3. to add migration 
 npx db-migrate create name //(put whatever name you want instead of word name)

4. to reset: npx db-migrate reset
5. To apply: npx db-migrate up  // meaning insert or update according to the sql query
6. To revert back: npx db-migrate down // revert the prev step
