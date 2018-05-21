#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const display = require(__dirname + '/libs/ledmatrix/index.js');
  const emoji = require(__dirname + '/libs/emoji/index.js');
  const debug = require('debug')('main');
  display.init();
  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'ledmatrix');
  });

  socket.on('emoji', (data) => {
    'use strict';
    display.image(display.presets[data]);
  });

  display.image(display.presets.smile);

  emoji.start(() => {
      'use strict';
      emoji.on('emoji', (emoji) => {
        console.log(chalk.magenta('new emoji received! applying...'));
        display.image(emoji);
      });
      emoji.on('reset', (emoji) => {
        console.log(chalk.magenta('emoji reset request received! applying...'));
        display.image(display.presets.smile);
      });
    });
}
