import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import dotenv from 'dotenv';
dotenv.config();
const hashPassword = password => bcrypt.hashSync(password, 10);
const comparePasswords = (plain, encrypted) => {
  return bcrypt.compareSync(plain, encrypted) ? true : false;
}
const authenticateUser = ({id,email,first_name, is_admin}) => {
  const { SECRET } = process.env;
  return jwt.sign({
    id,
    email,
    first_name,
    is_admin
  },
  SECRET,
  { expiresIn : 3600}) // expires in an hour
}
const respond = (res, statusCode, statusText, message, payload) => {
  return statusText !== "error" 
    ? res.status(statusCode).send({
      status : statusCode,
      message,
      data : payload
    })
    : res.status(statusCode).send({
      status : statusCode,
      error : payload
    })
}
const formatDate = d => {
  d = new Date(d);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
const dateIsPassed = d => {
  const today = new Date();
  d = new Date(d);
  return (d.getFullYear() < today.getFullYear()) 
  ? true
  : (d.getFullYear() === today.getFullYear()) && (d.getMonth() < today.getMonth())
  ? true : false;
}
export default { hashPassword, comparePasswords, authenticateUser, respond, dateIsPassed, formatDate };
