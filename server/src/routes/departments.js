import express from 'express'
import DepartmentsController from '../controllers/departments'
import responses from '../api-responses'
import { Department } from '../models'

const router = express.Router()
const controller = DepartmentsController({ responses, Department })

router.get('/', (req, res, next) => controller.get(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))
router.delete('/:name', (req, res, next) => controller.remove(req, res, next))

export default router
