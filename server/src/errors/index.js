import factory from 'error-factory'

export const EmployeeNotFound = factory('EmployeeNotFound')
export const EmployeeAlreadyExists = factory('EmployeeAlreadyExists')
export const DepartmentAlreadyExists = factory('DepartmentAlreadyExists')

export default {
  EmployeeNotFound,
  EmployeeAlreadyExists,
  DepartmentAlreadyExists
}
