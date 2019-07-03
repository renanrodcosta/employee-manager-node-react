import { DepartmentAlreadyExists } from '../errors'
const departmentsController = ({ responses, Department }) => {
  const _validateAlreadyExists = exists => {
    if (!exists) return Promise.resolve()

    const error = 'A department already exists.'
    return Promise.reject(DepartmentAlreadyExists(error))
  }

  const get = (_, res, next) => {
    const { ok, internalError } = responses(res)

    return Department.find({})
      .then(ok)
      .catch(internalError)
      .then(next)
  }

  const create = (req, res, next) => {
    const { created, conflict, internalError } = responses(res)
    const { body } = req

    return Department.count({ name: body.name })
      .then(_validateAlreadyExists)
      .then(() => new Department(body))
      .then(department => {
        department.save()
        return department
      })
      .then(_ => created(`/departments/${body.name}`))
      .catch(DepartmentAlreadyExists, conflict)
      .catch(internalError)
      .then(next)
  }

  const remove = (req, res, next) => {
    const { noContent, internalError } = responses(res)
    const { name } = req.params

    return Department.deleteOne({ name })
      .then(noContent)
      .catch(internalError)
      .then(next)
  }

  return { get, create, remove }
}

export default departmentsController
