#!/bin/env node

const util = require('util');
const _ = require('lodash');
const chalk = require('chalk');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(80);

let services = [];

let getServicIndexById = function(id) {
  'use strict';
  let index = _.findIndex(services, function(o) {
    return o.id == id;
  });
  return index;
};

let getServiceIndexByName = function(name) {
  'use strict';
  let index = _.findIndex(services, function(o) {
    return o.name == name;
  });
  return index;
};

io.on('connection', function(socket) {
  'use strict';
  socket.on('disconnect', function() {
    console.log('a service disconnected');
  });

  socket.on('identify', (serviceName) => {
    let index = getServiceIndexByName(serviceName);
    if (index > -1) {
      services.splice(index, 1);
    }
    services.push({
      'id': socket.id,
      "name": serviceName
    });
    console.log(chalk.cyan('service ' + chalk.underline(serviceName) + ' identified with ID ' + chalk.underline(socket.id)));
  });

});
