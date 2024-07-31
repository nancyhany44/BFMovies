import { Pool, PoolClient, QueryResult } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function fetchData(): Promise<void> {
    let client: PoolClient | undefined;
  
    try {
      client = await pool.connect();
      try {
        const res: QueryResult = await client.query('SELECT * FROM "users"');
        console.log('Connected to PostgreSQL:', res.rows);
      } catch (queryError) {
        console.error('Error executing query', (queryError as Error).stack);
      } finally {
        client.release();
      }
    } catch (connectionError) {
      console.error('Error connecting to database', (connectionError as Error).stack);
    }
  }
  
  fetchData();