// import http from 'http'
//
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'})
//   res.end('Hello World\n')
// }).listen(1337, '127.0.0.1')
//
// console.log('Server running at http://127.0.0.1:1337/')

import path from 'path'
import Express from 'express'
import handleRender from './handleRender'

const app = Express()
const port = 1337

//Serve static files
app.use('/static', Express.static('static'))

const entryPath = require('../webpack-assets.json')
app.use('/', function(req, res, next) {
  // get entryPath with every quest
  req.entryPath = entryPath

  next();
})

// This is fired every time the server side receives a request
app.use(handleRender)

app.listen(port)
