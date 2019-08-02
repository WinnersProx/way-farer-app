import Trips from '../models/trips';
const tripsController = {
    createTrip : (req, res) => {
        req.body.status = 'active';
        const trip = Trips.create(req.body, 'trips');
        const { id, seating_capacity, origin, destination, trip_date, fare } = trip;
        return res.status(201)
        .send({
            status : 201,
            data : {
                trip_id : id,
                seating_capacity,
                origin,
                destination,
                trip_date,
                fare
            }
        })
    },
    cancelTrip : (req, res) => {
        const canceledTrip = Trips.cancel(parseInt(req.params.trip_id));
        return res.status(201).send({
            status : "success",
            data   : {
                message : "Trip cancelled successfully"
            }
        });
    }
  
}
export default tripsController