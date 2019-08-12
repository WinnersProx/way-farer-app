import Bookings from '../models/bookings';
import userHelper from '../helpers/user_helper';
const bookingsController = {
  bookSeat : (req, res) => {
    req.body.user_id = req.user.id;
    const booking = Bookings.create(req.body, 'bookings');
    const targetTrip = Bookings.findbyField('id','trips', parseInt(req.body.trip_id));
    userHelper.respond(res, 201, "success", "you successfully booked a seat", {
      booking_id  : booking.id,
      bus_licence_number : targetTrip.bus_licence_number,
      trip_date          : targetTrip.trip_date,
      first_name         : req.user.first_name,
      last_name          : req.user.first_name,
      user_email         : req.user.email
    });
  },
  deleteBooking : (req, res) => {
    Bookings.delete(req.params.booking_id);
    userHelper.respond(res, 200, "success", "booking deleted successfully", { message : "Booking deleted successfully"});
  },
  viewBookings : (req, res) => {
    const bookings = (req.user.is_admin) ? Bookings.findAll('bookings') : Bookings.findUserBookings(req.user.id);
    userHelper.respond(res, 200, "success", "OK", bookings);
  }
}

export default bookingsController;
