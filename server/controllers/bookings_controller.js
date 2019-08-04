import Bookings from '../models/bookings';
const bookingsController = {
    bookSeat : (req, res) => {
        req.body.user_id = req.user.id;
        const booking = Bookings.create(req.body, 'bookings');
        const targetTrip = Bookings.findbyField('id','trips', parseInt(req.body.trip_id));
        return res.status(201)
        .send({
            status : "success",
            data : {
                booking_id         : booking.id,
                bus_licence_number : targetTrip.bus_licence_number,
                trip_date          : targetTrip.trip_date,
                first_name         : req.user.first_name,
                last_name          : req.user.first_name,
                user_email         : req.user.email
            }
        })
    }
}
export default bookingsController