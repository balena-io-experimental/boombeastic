#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const spawn = require('child_process').spawn;

  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'file-manager');
  });

  console.log(chalk.cyan('starting node-file-manager'));
  const filemanager = spawn('node-file-manager', ['-p', '8000', '-d', '/data/mopidy/media']);

  filemanager.stdout.on('data', (data) => {
    'use strict';
    console.log(`filemanager: ${data}`);
  });

  filemanager.stderr.on('data', (data) => {
    'use strict';
    console.log(`filemanager: ${data}`);
  });

  filemanager.on('close', (code) => {
    'use strict';
    console.log(`filemanager process exited with code ${code}`);
  });
}
