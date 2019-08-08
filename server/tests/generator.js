import bcrypt from 'bcrypt';
import User from '../models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import userHelper from '../helpers/user_helper';
chai.use(chaiHttp);
const generator = {
    users : [
        {
            email : "bihames4vainqueur@gmail.com",
            first_name:"Bihame",
            last_name:"Vainqueur",
            password: userHelper.hashPassword('usertest'),
            address:"Goma",
            isAdmin : false
        },
        {
            email : "georgeTest@gmail.com",
            first_name:"George",
            last_name:"Test",
            password: userHelper.hashPassword('usertest'),
            address:"Goma",
            isAdmin : false
        }
    ],
    trips : [
        {
            seating_capacity: 5,
            origin: "Goma Ville",
            destination: "Kampala",
            trip_date: "08/25/2020",
            fare: 35.000,
            bus_licence_number : 'BL025525666',
            status             : "active"
        },
        {
            seating_capacity: 80,
            origin: "Goma Ville",
            destination: "Kampala",
            trip_date: "08/25/2020",
            fare: 35.000,
            bus_licence_number : 'BL025525666',
            status             : "cancelled"
        }
    ],
    bookings : [
        {
            trip_id : 1,
            user_id : 1,
            seat_number : 1
        },
        {
            trip_id : 1,
            user_id : 2,
            seat_number : 1
        }
    ],
    generateUsers : () => {
        generator.users.forEach(user => {
            let newUser = User.create(user, 'users');
            newUser = newUser.id === 1 ? User.setAsAdmin(newUser.id) : newUser;
        });
    },
    generateTrips : () => {
        generator.trips.forEach(trip => {
            const newTrip = User.create(trip, 'trips');
        });
    },
    generateBookings : () => {
        generator.bookings.forEach(booking => {
            const newBooking = User.create(booking, 'bookings');
        });
    }
}
export default generator;