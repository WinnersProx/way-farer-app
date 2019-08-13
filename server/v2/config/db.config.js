import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
let pool;
if(process.env.NODE_ENV === 'production'){
	const connectionString = process.env.DATABASE_URL;
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
