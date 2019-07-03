import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Department ({ clients }) {
  const {
    employeeManager: { client }
  } = clients
  const [name, setName] = useState('')

  const [departments, setDepartments] = useState([])

  const loadDepartments = async () => {
    try {
      const { data } = await client.get('/departments')
      setDepartments(data)
    } catch (error) {
      console.error('Fail to load list of departments.')
    }
  }

  const save = () => {
    client
      .post('/departments', { name })
      .then(_ => {
        setName('')
        setDepartments([...departments, { name }])
      })
      .catch(console.error)
  }

  const remove = department => {
    client
      .delete(`/departments/${department.name}`)
      .then(_ => {
        const _depardepartments = departments.filter(
          dep => dep.name !== department.name
        )
        setDepartments(_depardepartments)
      })
      .catch(console.error)
  }

  useEffect(() => {
    loadDepartments()
  }, [])

  return (
    <div className='container'>
      <div className='row' id='main'>
        <div className='col-md-12'>
          <h4>
            <i className='fa fa-file-text-o' /> Departments
          </h4>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-md-10 col-md-offset-1'>
          <form>
            <div className='col-md-11'>
              <div className='form-group'>
                <label>Name</label>
                <input
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  type='name'
                  className='form-control'
                  placeholder='Enter name'
                />
              </div>
            </div>
            <div className='col-md-1'>
              <div className='form-group'>
                <label />
                <button
                  type='button'
                  className='btn btn-primary mt-5p'
                  disabled={!name}
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        {(departments.length > 0 || null) && (
          <div className='col-md-10 col-md-offset-1'>
            <table className='table table-striped'>
              <tbody>
                {departments.map(department => (
                  <tr key={department.name}>
                    <td>{department.name}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger float-right'
                        onClick={() => remove(department)}
                      >
                        <i className='fa fa-trash' />
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

Department.propTypes = {
  clients: PropTypes.object.isRequired
}

export default Department
