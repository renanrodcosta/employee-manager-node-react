import axios from 'axios'

const employeeManagerApiClient = axios.create({
  baseURL: process.env.REACT_APP_EMPLOYEEMANAGER_API_ENDPOINT || 'http://localhost:3001',
  responseType: 'json'
})

export default {
  employeeManager: {
    client: employeeManagerApiClient
  }
}
