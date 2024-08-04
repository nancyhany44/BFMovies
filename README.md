# BFMovies

steps
1. npm install
npm install ts-node --save-dev
2. add the .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bfmovies
DB_USER=user
DB_PASSWORD= ""

---or IN example.env: just remove the example word and keep it .env only

3. to genertae migration 
  npm run typeorm migration:generate -- -d src/data-source.ts src/migration/name //(put whatever name you want instead of word name)

4. To apply: npm run migration:run  // meaning insert or update according to the sql query
5. To revert back: npm run migration:revert // revert the prev step
6. NOTE: must create db names bfmovies then run migration files like above steps
