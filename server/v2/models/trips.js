import Model from '../models/index';
import userHelper from '../helpers/user_helper';
import pool from '../config/db.config'
class TripsModel extends Model{
  constructor(){
    super();
  }
  async newTrip(datas){
     const { seating_capacity, origin, destination, trip_date, fare, bus_licence_number } = datas;
     const queryString = {
      text: `INSERT INTO trips
            (seating_capacity, origin, destination, trip_date, fare, bus_licence_number)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING*;`,
      values: [seating_capacity, origin, destination, trip_date, fare, bus_licence_number]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async cancel(tripId){
    const queryString = {
      text: `UPDATE trips SET status=$1 WHERE id=$2;`,
      values: ['cancelled', tripId]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  filterBy(target, targetValue){
    return db.trips.filter(trip => trip[target] === targetValue);
  }
  async tripBookingsCount(tripId){
    const queryString = {
      text: `SELECT *FROM bookings WHERE trip_id=$1;`,
      values: [tripId]
    };
    const { rows } = await pool.query(queryString);
    return rows.length;
  }
  async find(available = false){
    const queryString = {
      text: available ? `SELECT *FROM trips WHERE status=$1;` 
      : `SELECT *FROM trips;`,
      values: available ? ['active'] : []
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  async tripExists({trip_date, bus_licence_number}){
    const formatedDate = new Date(trip_date);
    const queryString = {
      text: `SELECT *FROM trips WHERE trip_date=$1 AND bus_licence_number=$2;`,
      values: [formatedDate, bus_licence_number]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
}

export default new TripsModel();
