#!/bin/env node

{
  const chalk = require("chalk");
  const isOnline = require('is-online');
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const debug = require('debug')('main');
  const {
    spawn
  } = require('child_process');
  let wifiConnect;
  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'network');
    isOnline().then(online => {
      if (!online) {
        console.log(chalk.yellow("online check failed, spawning wifi-connect"));
        socket.emit("emoji", "wifi");
        wifiConnect = spawn(__dirname + '/.wifi-connect', ['-a', '600', '-u', '/usr/src/app/ui']);
        wifiConnect.on('close', (code) => {
          console.log(chalk.cyan("wifi-connect exited"));
          socket.emit('emoji', "smile");
        });
        wifiConnect.on('data', (output) => {
          console.log(chalk.cyan("wifi-connect: ") + output);
        });
      } else {
        console.log(chalk.green("online check ok, skipping wifi-connect"));
      }
    });
  });
}
