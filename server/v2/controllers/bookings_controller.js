import Bookings from '../models/bookings';
import userHelper from '../helpers/user_helper';
const bookingsController = {
  bookSeat : async (req, res) => {
    const { id, first_name, last_name, email } = req.user;
    req.body.user_id = id;
    const booking = await Bookings.create(req.body, 'bookings');
    const targetTrip = await Bookings.findbyField('id','trips', parseInt(req.body.trip_id));
    const { bus_licence_number, trip_date } = targetTrip;
    
    userHelper.respond(res, 201, "success", "you successfully booked a seat", {
      booking_id  : booking.id,
      bus_licence_number : bus_licence_number,
      trip_date          : trip_date,
      first_name         : first_name,
      last_name          : last_name,
      user_email         : email
    });
  },
  deleteBooking : async (req, res) => {
    await Bookings.delete(parseInt(req.params.booking_id));
    userHelper.respond(res, 200, "success", "booking deleted successfully");
  },
  viewBookings : async (req, res) => {
    const { is_admin } = req.user;
    const bookings = (is_admin) ? await Bookings.find() : await Bookings.find(req.user.id);
    userHelper.respond(res, 200, "success", "OK", bookings);
  }
}

export default bookingsController;
