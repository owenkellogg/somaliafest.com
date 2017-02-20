'use strict';

const Hapi = require('hapi');
const http = require('superagent')
const Path = require('path')
const Inert = require('inert')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.register(Inert, () => {});

// Add the route
server.route({
    method: 'POST',
    path:'/leads', 
    handler: function (request, reply) {

      http
        .post('https://leads.stevenzeiler.com/leads')
        .send(request.body)
        .end((error, response) => {
          if (error) {
            reply({ success: false })
          } else {
            reply({ success: true })
          }
        })
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, 'public'),
            listing: true
        }
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
