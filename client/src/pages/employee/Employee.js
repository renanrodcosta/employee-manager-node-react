import React, { useState } from 'react'
import Select from 'react-select'

function Employee () {
  const [employee, setEmployee] = useState({})
  const [departments, setDepartments] = useState({
    isLoading: false,
    options: []
  })

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
                value={employee.email}
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
                value={employee.name}
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
                placeholder='Selecione um usuário'
                onChange={option => setEmployee({ ...employee, department: option.value })}
                isClearable
              />
            </div>
            <button type='button' className='btn btn-primary float-right'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Employee
