import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
import pool from '../config/db.config';
class UserModel extends Model{
    constructor(){
        super();
    }
    async createUser(datas, model){
    	const { email, first_name, last_name, password, address } = datas;
        const queryString = {
            text: `INSERT INTO users
            (email, first_name, last_name, password, address)
            VALUES($1, $2, $3, $4, $5) RETURNING*;`,
            values: [email, first_name, last_name, password, address]
        };
        const { rows } = await pool.query(queryString);
        const firstUser = await this.first();
        return firstUser.id === rows[0].id ? this.setAsAdmin(rows[0].id) : rows[0];
    }
    async first(){
        const queryString = {
            text: `SELECT id,email FROM users LIMIT 1;`,
            values: []
        };
        const { rows } = await pool.query(queryString);
        return rows[0];
    }
    async setAsAdmin(userId){
    	const queryString = {
    		text : `UPDATE users SET is_admin=$1 WHERE id=$2 RETURNING*`,
    		values : [true, userId]
    	}
    	const { rows } = await pool.query(queryString);
    	return rows[0];
    }
    async userExists(email){
    	const queryString = {
    		text : `SELECT email FROM users WHERE email=$1`,
    		values : [email]
    	}
    	const { rows } = await pool.query(queryString);
    	return rows.length;
    }
}
export default new UserModel();
