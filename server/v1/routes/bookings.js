import express from 'express';
import authValidations from '../middlewares/auth_middleware';
import bookingsValidations from '../middlewares/bookings_middleware';
import bookingsController from '../controllers/bookings_controller';
const routes = express.Router()

routes
  .post('/bookings', authValidations.checkUserToken, bookingsValidations.validateBooking, bookingsValidations.isSeatAvailable,bookingsController.bookSeat)
  .delete('/bookings/:booking_id', authValidations.checkUserToken, bookingsValidations.validateDelete, bookingsController.deleteBooking)
  .get('/bookings/', authValidations.checkUserToken, bookingsController.viewBookings)
export default routes;