import { Pool } from 'pg';
const connectionString = 'postgres://winner:winners1@localhost:5432/way_farer_db';
const pool = new Pool({ 
	user: 'winner',
  	host: 'localhost',
  	database: 'way_farer_db',
  	password: 'winners1',
  	port: 5432
});

export default pool;