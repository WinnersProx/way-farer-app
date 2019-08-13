import express from 'express';
import authRouter from './auth';
import tripsRouter from './trips';
import bookingsRouter from './bookings';
import apiV2Authentication from '../middlewares/authentication.js';
const app = express();
app.use(apiV2Authentication.initialize());
const router = express.Router();
const docsUrl = 'https://way-farer-app-rest.herokuapp.com/api/v1/api-docs/';
router.use('/api/v2/', router);
router.use('/', authRouter);
router.use('/', tripsRouter);
router.use('/', bookingsRouter);

router.get('/', (req, res) => {
  res.status(200).send({message : `Welcome to WayFarer api feel home access the documentation ${docsUrl}`})
});

export default router;
