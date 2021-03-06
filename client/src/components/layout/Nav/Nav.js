import React from 'react'
import { Link } from 'react-router-dom'

function Nav () {
  return (
    <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <div className='navbar-header'>
        <div className='text-center text-white'>
          <h3>Employee Manager</h3>
        </div>
      </div>
      <ul className='nav navbar-right top-nav'>
        <li>
          <a href='javascript:void(0);'>
            <i className='fa' />
          </a>
        </li>
      </ul>
      <div className='collapse navbar-collapse navbar-ex1-collapse'>
        <ul className='nav navbar-nav side-nav'>
          <li>
            <Link to='/employees'>
              <i className='fa fa-fw fa-user-plus' /> Employees
            </Link>
          </li>
          <li>
            <Link to='/departments'>
              <i className='fa fa-fw fa-building' /> Departments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
