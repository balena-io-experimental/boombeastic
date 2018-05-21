#!/bin/env node

{
  const io = require('socket.io-client');
  const socket = io('http://localhost:1337');
  const fs = require('fs');
  const ini = require('ini');
  const exec = require('child_process').exec;
  const spawn = require('child_process').spawn;
  const chalk = require("chalk");
  const debug = require('debug')('main');

  socket.on('connect', () => {
    'use strict';
    socket.emit('identify', 'mopidy');
  });

  let mopidy = ini.parse(fs.readFileSync('/etc/mopidy/mopidy.conf', 'utf-8'));
  console.log(chalk.cyan('configuring Mopidy from env vars...'));
  let updating = false;

  // http config
  mopidy.http.port = parseInt(process.env.MOPIDY_HTTP_PORT) || 8080;
  // mpd config
  mopidy.mpd.port = parseInt(process.env.MOPIDY_MPD_PORT) || 6680;
  // audio config
  mopidy.audio.mixer_volume = parseInt(process.env.MOPIDY_AUDIO_MIXER_VOLUME) || 20;
  // Google Play Music config
  mopidy.gmusic.enabled = process.env.MOPIDY_GMUSIC_ENABLED === '1' ? true : false;
  mopidy.gmusic.username = process.env.MOPIDY_GMUSIC_USERNAME || "none";
  mopidy.gmusic.password = process.env.MOPIDY_GMUSIC_PASSWORD || "none";
  mopidy.gmusic.all_access = process.env.MOPIDY_GMUSIC_ALL_ACCESS === '1' ? true : false;
  // Spotify config
  mopidy.spotify.enabled = process.env.MOPIDY_SPOTIFY_ENABLED === '1' ? true : false;
  mopidy.spotify.username = process.env.MOPIDY_SPOTIFY_USERNAME || "none";
  mopidy.spotify.password = process.env.MOPIDY_SPOTIFY_PASSWORD || "none";
  // Soundcloud config
  mopidy.soundcloud.enabled = process.env.MOPIDY_SOUNDCLOUD_ENABLED === '1' ? true : false;
  mopidy.soundcloud.auth_token = process.env.MOPIDY_SOUNDCLOUD_AUTH_TOKEN || "none";
  // YouTube config
  mopidy.youtube.enabled = process.env.MOPIDY_YOUTUBE_ENABLED === '1' ? true : false;

  fs.writeFileSync('/etc/mopidy/mopidy.conf', ini.stringify(mopidy));

  // Mopidy
  console.log(chalk.cyan('starting Mopidy - HTTP port:' + mopidy.http.port + ' (proxy on port 80); MPD port:' + mopidy.mpd.port));
  exec('systemctl start mopidy', (error, stdout, stderr) => {
    'use strict';
    if (error) {
      console.log(chalk.red(`exec error: ${error}`));
      return;
    }
  });
}
