import { Pool } from 'pg';

let pool;

if (!pool) {
  pool = new Pool({
    user: process.env.PGUSER || 'namma_admin',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'mbas',
    password: process.env.PGPASSWORD || 'admin123',
    port: parseInt(process.env.PGPORT || '5432', 10),
  });
}

export const query = (text, params) => pool.query(text, params);
export default pool;