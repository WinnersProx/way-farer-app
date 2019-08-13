import pool from '../config/db.config';
class Model{
  constructor(){
    
  }
  async findbyField(field, model, value){
  	const queryString = {
      text: `SELECT * FROM ${model} WHERE ${field}=$1;`,
      values: [value]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
}

export default Model;
