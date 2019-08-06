import Trips from '../models/trips';
import userHelper from '../helpers/user_helper';
const tripsController = {
    createTrip : (req, res) => {
        req.body.status = 'active';
        const trip = Trips.create(req.body, 'trips');
        const { id, seating_capacity, origin, destination, trip_date, fare } = trip;
        userHelper.respond(res, 201, "success", {trip_id : id,seating_capacity,origin,destination,trip_date,fare});
    },
    cancelTrip : (req, res) => {
        const canceledTrip = Trips.cancel(parseInt(req.params.trip_id));
        userHelper.respond(res, 200, "success", {message : "Trip cancelled successfully"});
    },
    viewTrip : (req, res) => {
        const trip = Trips.findbyField('id', 'trips', parseInt(req.params.trip_id));
        const { id, seating_capacity, origin, destination, trip_date, fare } = trip;
        userHelper.respond(res, 200, "success", {trip_id : id,seating_capacity,origin,destination,trip_date,fare});

    },
    viewTrips : (req, res) => { 
        const trips = Trips.findAll('trips');
        userHelper.respond(res, 200, "success", trips);

    },
    filterTrips : (req, res) => {
        const { origin, destination } = req.query;
        const target = origin ? "origin" : "destination";
        const trips = Trips.filterBy(target, (origin ? origin : destination));
        userHelper.respond(res, 200, "success", trips);
    }
}
export default tripsController