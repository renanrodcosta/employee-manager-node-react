import express from 'express'
import employeesRoute from './employees'
import departmentsRoute from './departments'

const router = express.Router()

router.use('/employees', employeesRoute)
router.use('/departments', departmentsRoute)
router.get('/', (_, res) => res.send('On ;)'))

export default router
