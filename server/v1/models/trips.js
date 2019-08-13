import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
class TripsModel extends Model{
  constructor(){
    super();
  }
  cancel(tripId){
    const target = db.trips[tripId - 1].status = 'cancelled';
    return db.trips[tripId - 1];
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
}
export default new TripsModel();
