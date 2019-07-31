import express from 'express'
import authRouter from './auth';
import tripsRouter from './trips';
const router = express.Router()

router.use('/api/v1/', router)
router.use('/', authRouter)
router.use('/', tripsRouter)
// some other routes 
router.get('/', (req, res) => {
    res.status(200).send({message : 'Welcome to WayFarer api feel home'})
})


export default router