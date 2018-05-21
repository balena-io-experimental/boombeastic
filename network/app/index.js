#!/bin/env node

{
  const chalk = require("chalk");
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const debug = require('debug')('main');

  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'network');
  });

}
