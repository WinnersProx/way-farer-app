import pool from '../../config/db.config';
import userHelper from '../../helpers/user_helper';
const password = userHelper.hashPassword('usertest');
const user1 = `INSERT INTO users(email, first_name, last_name, password, address, is_admin) 
  VALUES('bihames4vainqueur@gmail.com', 'Bihame', 'Vainqueur', '${password}', 'Goma Ville', ${true});`;
const user2 = `INSERT INTO users(email, first_name, last_name, password, address) 
  VALUES('bihames4vainqueur@gmail.com', 'georgeTest', 'georgeTestLast', '${password}', 'Goma Ville');`;

const trip1 = `INSERT INTO trips(seating_capacity, origin, destination, trip_date, fare, bus_licence_number) 
  VALUES(${5}, 'Goma Ville', 'Kampala', '08/25/2020', ${35.000}, 'BL025525666');`;

const trip2 = `INSERT INTO trips(seating_capacity, origin, destination, trip_date, fare, bus_licence_number, status) 
  VALUES(${5}, 'Kampala', 'Goma Ville', '08/25/2020', ${35.000}, 'BL025525667', 'cancelled');`;

const book1 = `INSERT INTO bookings(trip_id, user_id, seat_number) VALUES(${1}, ${1}, ${1});`;
const book2 = `INSERT INTO bookings(trip_id, user_id, seat_number) VALUES(${1}, ${2}, ${1});`;

const queryString = `
${user1}
${user2}
${trip1}
${trip2}
${book1}
${book2}
`;

(async () => {
  try {
    await pool.query(queryString);
  } 
  catch (error) {
    console.log(error);
  }
})();
