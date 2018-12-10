#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const supervisor = require(__dirname + '/libs/supervisor/index.js');
  const debug = require('debug')('main');

  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'supervisor');
  });

  supervisor.start(500, () => {
    'use strict';
    supervisor.on('status', (status) => {
      console.log(chalk.white('Supervisor status update: ' + status));
      switch (status) {
        case "idle":
          socket.emit("emoji","smile");
          break;
        case "downloading":
          socket.emit("emoji","download");
          break;
        case "stopping":
          socket.emit("emoji","busy");
          break;
      }
    });
  });

  process.on('SIGTERM', () => {
    'use strict';
    socket.emit('emoji', 'stop');
    process.exit(1);
  });

}
