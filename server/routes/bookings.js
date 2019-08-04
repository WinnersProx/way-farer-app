import express from 'express';
import authValidations from '../middlewares/auth_middleware';
import bookingsValidations from '../middlewares/bookings_middleware';
import bookingsController from '../controllers/bookings_controller';
const routes = express.Router()
// hence we'll be using customized middlewares to validate all the auth requests
routes
.post('/bookings', authValidations.checkUserToken, bookingsValidations.validateBooking, bookingsValidations.isSeatAvailable,bookingsController.bookSeat)

export default routes;