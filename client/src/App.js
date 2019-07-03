import React from 'react'

function App () {
  return (
    <div id='wrapper'>
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
              <a href='/employees'>
                <i className='fa fa-fw fa-user-plus' /> Employees
              </a>
            </li>
            <li>
              <a href='/deparments'>
                <i className='fa fa-fw fa-building' /> Departments
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id='page-wrapper'>
        <div className='container-fluid'>
          <div className='row' id='main'>
            <div className='col-sm-12 col-md-12'>
              <h4>
                <i className='fa fa-file-text-o' />{' '}Welcome Admin!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
