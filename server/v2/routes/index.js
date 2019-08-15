import express from 'express';
import authRouter from './auth';
import tripsRouter from './trips';
import bookingsRouter from './bookings';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const { DOCS_V2_URL } = process.env;
router.use('/api/v2/', router);
router.use('/', authRouter);
router.use('/', tripsRouter);
router.use('/', bookingsRouter);

router.get('/', (req, res) => {
  res.status(200).send({message : `Welcome to WayFarer api feel home access the documentation ${DOCS_V2_URL}`})
});

export default router;
