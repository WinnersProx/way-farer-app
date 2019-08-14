import express from 'express';
import authValidations from '../middlewares/auth_middleware';
import tripsValidations from '../middlewares/trips_middleware';
import tripsController from '../controllers/trips_controller';
const routes = express.Router()

routes
  .post('/trips', authValidations.checkUserToken, authValidations.isAdmin, tripsValidations.validateTrip, tripsValidations.tripExists, tripsController.createTrip)
  .patch('/trips/:trip_id/cancel', authValidations.checkUserToken, authValidations.isAdmin, tripsValidations.isValidTrip, tripsController.cancelTrip)
  .get('/trips/:trip_id', tripsValidations.isValidTrip, tripsController.viewTrip)
  .get('/trips/',  tripsController.viewTrips)
  .get('/filter/trips', tripsValidations.validateFilter, tripsController.filterTrips)

export default routes;
