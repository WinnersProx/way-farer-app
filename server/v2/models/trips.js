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
  tripBookingsCount(tripId){
    return db.bookings.filter(booking => parseInt(booking.trip_id) === tripId).length;
  }
  findAvailable(){
    return db.trips.filter(trip => trip.status === 'active')
      .map(trip =>{
        trip.available_seats = parseInt(trip.seating_capacity) - this.tripBookingsCount(trip.id);
        return trip;
      });
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
