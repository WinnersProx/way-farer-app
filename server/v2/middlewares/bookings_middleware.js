import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import Trips from '../models/trips';
import Bookings from '../models/bookings';
const bookingsSchema = Joi.object().keys({
  id : Joi.number().integer(),
  trip_id : Joi.number().integer().min(1).required(),
  user_id : Joi.number().integer().min(1),
  seat_number : Joi.number().integer().min(1),
  created_on  : Joi.date()
});
export default  {
  validateBooking : async (req, res, next) => {
    let { trip_id } = req.body;
    const validate = bookingsSchema.validate(req.body);
    const targetTrip = await Trips.findbyField('id','trips', parseInt(trip_id));
    if(validate.error){
      return userHelper.respond(res, 400, "error","", validate.error);
    }
    if(!targetTrip || targetTrip.status !== "active"){
      const status = !targetTrip ? 404 : 400;
      return userHelper.respond(res, status, "error","", status === 404 
        ? "The specified trip does not exist" 
        : "The target trip is not active"
      );

    }
    next();
  },
  isSeatAvailable : async (req, res, next) => {
    let { trip_id, seat_number } = req.body;
    const targetTrip = await Trips.findbyField('id','trips', parseInt(trip_id));
    seat_number = (seat_number) ? parseInt(seat_number) : await Bookings.countBookingsOnTrip(parseInt(trip_id)) + 1;
    req.body.seat_number = seat_number;
    const checkAvailability = await Bookings.isValidSeat(seat_number, parseInt(trip_id));
    if(seat_number > targetTrip.seating_capacity){
      // the specified seat is not available
      return userHelper.respond(res, 400, "error", "", "The specified seat is not available");
    }
    if(checkAvailability){
      // the seat is already taken 
      return userHelper.respond(res, 400, "error", "", `The specified seat is already taken, try with another one`);
    }
    next();
  },
  validateDelete : (req, res, next) => {
    // booking credentials should be defined correctly
    const { booking_id } = req.params;
    const validate = Joi.number().integer().validate(booking_id);
    const booking  = Bookings.findbyField('id', 'bookings', parseInt(booking_id));
    if(validate.error){
      return userHelper.respond(res, 400, "error","", validate.error);
    }
    // booking should exist
    if(!booking){
      return userHelper.respond(res, 404, "error","", "The target booking was not found");
    }
    // the user should be either owner or admin
    if(!(req.user.id === parseInt(booking.user_id)) || !(req.user.isAdmin)){
      return userHelper.respond(res, 403, "error", "", "You must be the owner of this booking to delete it");
    }

    next();
  }
}
