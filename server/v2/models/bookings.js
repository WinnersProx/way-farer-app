import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
class BookingsModel extends Model{
  constructor(){
    super();
  }
  delete(bookingId){
    db.bookings.splice((bookingId - 1),1);
  }
  findUserBookings(userId){
    return db.bookings.filter(booking => booking.user_id === userId);
  }
}

export default new BookingsModel();
