import { EmployeeNotFound, EmployeeAlreadyExists } from '../errors'
const AlreadyExistsError = EmployeeAlreadyExists(
  'An employee already exists with this e-mail.'
)

const employeesController = ({ responses, Employee }) => {
  const _validateAlreadyExists = exists => {
    if (!exists) return Promise.resolve()

    return Promise.reject(AlreadyExistsError)
  }

  const _validadeExists = employee => {
    if (employee) return Promise.resolve(employee)

    return Promise.reject(EmployeeNotFound('Employee not found.'))
  }

  const get = (_, res, next) => {
    const { ok, internalError } = responses(res)

    return Employee.find({})
      .exec()
      .then(ok)
      .catch(internalError)
      .then(next)
  }

  const getById = (req, res, next) => {
    const { ok, notFound, internalError } = responses(res)

    const {
      params: { id }
    } = req

    return Employee.findOne({ _id: id })
      .then(_validadeExists)
      .then(ok)
      .catch(EmployeeNotFound, notFound)
      .catch(internalError)
      .then(next)
  }

  const create = (req, res, next) => {
    const { created, conflict, internalError } = responses(res)
    const { body } = req

    return Employee.count({ email: body.email })
      .exec()
      .then(_validateAlreadyExists)
      .then(() => new Employee(body))
      .then(employee => {
        employee.save()
        return employee
      })
      .then(_ => created(`/employees/${body.email}`))
      .catch(EmployeeAlreadyExists, conflict)
      .catch(internalError)
      .then(next)
  }

  const update = (req, res, next) => {
    const { noContent, conflict, internalError } = responses(res)

    return Employee.findOne({ email: req.body.email })
      .then(employee => {
        if (employee && employee._id !== req.params.id) {
          return Promise.reject(AlreadyExistsError)
        }

        return Promise.resolve(employee)
      })
      .then(_ => {
        return Employee.findOneAndUpdate({ _id: req.params.id }, req.body)
      })
      .then(noContent)
      .catch(EmployeeAlreadyExists, conflict)
      .catch(internalError)
      .then(next)
  }

  const remove = (req, res, next) => {
    const { noContent, internalError } = responses(res)
    const { id } = req.params

    return Employee.remove({ _id: id })
      .then(noContent)
      .catch(internalError)
      .then(next)
  }

  return { get, getById, create, update, remove }
}

export default employeesController
