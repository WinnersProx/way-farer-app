import express from 'express';
import authValidations from '../middlewares/auth_middleware';
import tripsValidations from '../middlewares/trips_middleware';
import tripsController from '../controllers/trips_controller';
const routes = express.Router()
// hence we'll be using customized middlewares to validate all the auth requests
routes
.post('/trips', authValidations.checkUserToken, authValidations.isAdmin, tripsValidations.validateTrip, tripsController.createTrip)
.patch('/trips/:trip_id/cancel', authValidations.checkUserToken, authValidations.isAdmin, tripsValidations.isValidTrip, tripsController.cancelTrip)
export default routes;