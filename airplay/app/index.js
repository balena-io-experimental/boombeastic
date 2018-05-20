#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost');
  const ShairportReader = require('shairport-sync-reader');
  const pipeReader = new ShairportReader({
    path: '/tmp/shairport-sync-metadata'
  });
  const debug = require('debug')('main');

  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'airplay');
  });

  pipeReader.on('pbeg', (data) => {
    'use strict';
    console.log(chalk.cyan('AirPlay stream started'));
    socket.emit("emoji",display.presets.airplay);
    if (data) {
      console.dir(data);
    }
  });

  pipeReader.on('pend', (data) => {
    'use strict';
    console.log(chalk.yellow('AirPlay stream ended'));
    socket.emit("emoji",display.presets.smile);
  });

  pipeReader.on('meta', (data) => {
    'use strict';
    if (data) {
      console.dir(data);
    }
  });

  pipeReader.on('error', (error) => {
    'use strict';
    if (error) {
      console.dir(error);
    }
  });
}
