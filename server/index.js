const express = require('express');
const http = require('http');
const router = require('./routes.js');

const app = express();

// middleware (morgan and body-parser)
require('./config/middleware.js')(app, express);

// routes
router(app);

// set port and server
const port = process.env.PORT || 3030;
const server = http.createServer(app);

// bind and listen to connections on specified port
server.listen(port);
console.log("server listening on: ", port);


module.exports = app;
