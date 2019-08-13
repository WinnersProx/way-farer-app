import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
let pool;
const { NODE_ENV, DATABASE_URL } = process.env;
if(NODE_ENV === 'production'){
	const connectionString = DATABASE_URL;
	pool = new Pool({ connectionString });
}
else{
	pool = new Pool({
		user: 'postgres',
	  host: 'localhost',
	  database: 'way_farer_db',
	  password: process.env.USER_PASSWORD,
	  port: 5432
	})
}


export default pool;
