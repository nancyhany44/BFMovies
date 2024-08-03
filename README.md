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

3. to genertae migration 
  npm run typeorm migration:generate -- -d src/data-source.ts src/migration/name //(put whatever name you want instead of word name)

4. To apply: npm run migration:run  // meaning insert or update according to the sql query
5. To revert back: npm run migration:revert // revert the prev step
6. NOTE: must create db names bfmovies then run migration files like above steps
