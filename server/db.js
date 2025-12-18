import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'parts_inventory',
  password: '123456',
  port: 5433,
});

export default pool;
