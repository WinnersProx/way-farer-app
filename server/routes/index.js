import express from 'express'
import authRouter from './auth'
const router = express.Router()

router.use('/api/v1/', router)
router.use('/', authRouter)
// some other routes 
router.get('/', (req, res) => {
    res.send({message : 'Welcome to WayFarer api feel home'})
})


export default router