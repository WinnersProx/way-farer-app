import { Pool } from 'pg';

const pool = new Pool({ 
	user: 'me',
  	host: 'localhost',
  	database: 'way_farer_db',
  	password: 'winners1',
  	port: 5432
});

export default pool;