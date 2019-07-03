import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

function Employee ({ clients }) {
  const {
    employeeManager: { client }
  } = clients

  const [employee, setEmployee] = useState({})
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState({
    isLoading: false,
    options: []
  })

  const loadDepartments = async () => {
    setDepartments({ isLoading: true, options: [] })
    try {
      const { data } = await client.get('/departments')
      const options = data.map(department => ({
        value: department.name,
        label: department.name
      }))

      setDepartments({ isLoading: false, options })
    } catch (error) {
      setDepartments({ isLoading: false, options: [] })
      console.error('Fail to load list of departments.')
    }
  }

  const loadEmployees = async () => {
    try {
      const { data } = await client.get('/employees')
      setEmployees(data)
    } catch (error) {
      console.error('Fail to load list of departments.')
    }
  }

  const insert = () => {
    client
      .post('/employees', employee)
      .then(_ => {
        setEmployee({})
        loadEmployees()
      })
      .catch(console.error)
  }

  const update = () => {
    client
      .put(`/employees/${employee._id}`, employee)
      .then(_ => {
        setEmployee({})
        loadEmployees()
      })
      .catch(console.error)
  }

  const remove = employee => {
    client
      .delete(`/employees/${employee._id}`)
      .then(_ => {
        loadEmployees()
      })
      .catch(console.error)
  }

  useEffect(() => {
    loadDepartments()
    loadEmployees()
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row' id='main'>
        <div className='col-md-12'>
          <h4>
            <i className='fa fa-file-text-o' /> Employees
          </h4>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-md-10 col-md-offset-1'>
          <form>
            <div className='form-group'>
              <label>Email address</label>
              <input
                value={employee.email || ''}
                onChange={({ target }) =>
                  setEmployee({ ...employee, email: target.value })
                }
                type='email'
                className='form-control'
                placeholder='Enter email address'
              />
            </div>
            <div className='form-group'>
              <label>Name</label>
              <input
                value={employee.name || ''}
                onChange={({ target }) =>
                  setEmployee({ ...employee, name: target.value })
                }
                type='email'
                className='form-control'
                placeholder='Enter name'
              />
            </div>
            <div className='form-group'>
              <label>Department</label>
              <Select
                isLoading={departments.isLoading}
                options={departments.options}
                value={
                  employee.department
                    ? {
                      value: employee.department,
                      label: employee.department
                    }
                    : null
                }
                placeholder='Select a department...'
                onChange={option =>
                  setEmployee({
                    ...employee,
                    department: option ? option.value : ''
                  })
                }
                isClearable
              />
            </div>
            <button
              type='button'
              className='btn btn-primary float-right m-5p'
              disabled={
                !employee.name || !employee.email || !employee.department
              }
              onClick={() => (employee._id ? update() : insert())}
            >
              Save
            </button>
            {(employee._id || null) && (
              <button
                type='button'
                className='btn float-right m-5p'
                onClick={() => setEmployee({})}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        {(employees.length > 0 || null) && (
          <div className='col-md-10 col-md-offset-1'>
            <h1 />
            <table className='table table-striped'>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee._id}>
                    <td>{employee.email}</td>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger float-right'
                        onClick={() => remove(employee)}
                      >
                        <i className='fa fa-trash' />
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-info float-right'
                        onClick={() => setEmployee(employee)}
                      >
                        <i className='fa fa-pencil' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

Employee.propTypes = {
  clients: PropTypes.func.isRequired
}

export default Employee
