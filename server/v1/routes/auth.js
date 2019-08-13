import express from 'express'
import authController from '../controllers/auth_controller'
import authValidations from '../middlewares/auth_middleware';
const routes = express.Router()

routes
  .post('/auth/signup', authValidations.validateUser, authValidations.exists, authController.signup)
  .post('/auth/signin', authValidations.validateSignin, authController.signin)
export default routes;