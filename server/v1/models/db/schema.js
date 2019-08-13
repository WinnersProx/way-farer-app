import pool from '../../config/db.config';

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(254) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(120) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_on DATE DEFAULT NOW()
);
`;

const tripsTable = `
DROP TABLE IF EXISTS cars CASCADE;
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    seating_capacity INTEGER NOT NULL,
    fare FLOAT NOT NULL,
    bus_licence_number VARCHAR(30) NOT NULL,
    status VARCHAR(10) DEFAULT 'active',
    trip_date DATE NOT NULL,
    crated_on DATE DEFAULT NOW()
);
`;

const bookingsTable = `
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_on DATE DEFAULT NOW()
);
`;

const queryString = `
${usersTable}
${tripsTable}
${bookingsTable}
`;

(async () => {
  try {
    await pool.query(queryString);
  } catch (error) {
    if (error) console.log(error);
  }
})();