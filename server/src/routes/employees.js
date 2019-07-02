import express from 'express'
import EmployeesController from '../controllers/employees'
import responses from '../api-responses'
import { Employee } from '../models'

const router = express.Router()
const controller = EmployeesController({ responses, Employee })

router.get('/', (req, res, next) => controller.get(req, res, next))
router.get('/:id', (req, res, next) => controller.getById(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))
router.put('/:id', (req, res, next) => controller.update(req, res, next))
router.delete('/:id', (req, res, next) => controller.remove(req, res, next))

export default router
