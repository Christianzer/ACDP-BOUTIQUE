const axios = require('axios')
const https = require('https')
export default axios.create({
  baseURL: 'http://gestion-pvc.test/server_pvc/api',
  headers: {
    'Accept': 'application/json'

  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})
