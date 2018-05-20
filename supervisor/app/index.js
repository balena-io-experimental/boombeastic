#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost');
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
        case "Idle":
          socket.emit("emoji",display.presets.smile);
          break;
        case "Installing":
          socket.emit("emoji",display.presets.busy);
          break;
        case "Downloading":
          socket.emit("emoji",display.presets.download);
          break;
        case "Starting":
          socket.emit("emoji",display.presets.fwd);
          break;
        case "Stopping":
          socket.emit("emoji",display.presets.stop);
          break;
      }
    });
  });
}
