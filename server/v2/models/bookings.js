import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
import pool from '../config/db.config';
class BookingsModel extends Model{
  constructor(){
    super();
  }
  async create(datas){
     const { trip_id ,seat_number, user_id } = datas;
     const queryString = {
      text: `INSERT INTO bookings
            (trip_id, seat_number, user_id)
            VALUES($1, $2, $3) RETURNING*;`,
      values: [trip_id, seat_number, user_id]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async delete(bookingId){
     const queryString = {
      text: `DELETE FROM bookings WHERE id=$1`,
      values: [bookingId]
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  findUserBookings(userId){
    return db.bookings.filter(booking => booking.user_id === userId);
  }
  async countBookingsOnTrip(tripId){
  	const queryString = {
      text: `SELECT COUNT(*) FROM bookings WHERE trip_id=$1;`,
      values: [tripId]
    };
    const { rows } = await pool.query(queryString);
    return parseInt(rows[0].count);
  }
  async isValidSeat(seat, tripId){
  	const queryString = {
      text: `SELECT *FROM bookings WHERE trip_id=$1 AND seat_number=$2;`,
      values: [tripId, seat]
    };
    const { rows } = await pool.query(queryString);
    return rows.length;
  }
}

export default new BookingsModel();
