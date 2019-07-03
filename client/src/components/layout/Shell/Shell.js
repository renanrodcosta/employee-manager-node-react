import React from 'react'
import clients from '../../../api/clients'
import { Switch, Route } from 'react-router-dom'
import { Nav } from '../Nav'
import { Employee } from '../../pages/employee'
import { Department } from '../../pages/department'

function Shell () {
  return (
    <div id='wrapper'>
      <Nav />
      <div id='page-wrapper'>
        <Switch>
          <Route
            exact
            path='/employees'
            component={props => <Employee {...props} clients={clients} />}
          />
          <Route
            exact
            path='/departments'
            component={props => <Department {...props} clients={clients} />}
          />
        </Switch>
      </div>
    </div>
  )
}

export default Shell
