{
  const fs = require('fs');
  const ini = require('ini');
  const exec = require('child_process').exec;
  const chalk = require("chalk");
  const request = require('request');
  const display = require(__dirname + '/libs/ledmatrix/index.js');
  const supervisor = require(__dirname + '/libs/supervisor/index.js');
  const emoji = require(__dirname + '/libs/emoji/index.js');
  const debug = require('debug')('main');

  let mopidy = ini.parse(fs.readFileSync('/etc/mopidy/mopidy.conf', 'utf-8'));
  console.log(chalk.cyan('configuring Mopidy from env vars...'));
  let updating = false;

  // http config
  mopidy.http.port = parseInt(process.env.MOPIDY_HTTP_PORT) || 8080;
  // mpd config
  mopidy.mpd.port = parseInt(process.env.MOPIDY_MPD_PORT) || 6680;
  // audio config
  mopidy.audio.mixer_volume = parseInt(process.env.MOPIDY_AUDIO_MIXER_VOLUME) || 50;
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
  console.log(chalk.cyan('starting Mopidy - HTTP port:' + mopidy.http.port + ' (proxy on port 80); MPD port:' + mopidy.mpd.port));
  display.init(() => {
    'use strict';
    display.image(display.presets.splash);
  });
  exec('systemctl start mopidy', (error, stdout, stderr) => {
    'use strict';
    if (error) {
      console.log(chalk.red(`exec error: ${error}`));
      return;
    }
    console.log(chalk.green(`stdout: ${stdout}`));
    console.log(chalk.red(`stderr: ${stderr}`));
  });

  supervisor.start(500, () => {
    'use strict';
    supervisor.on('status', (status) => {
      console.log(chalk.white('Supervisor status update: ' + status));
      switch (status) {
        case "Idle":
          display.image(display.presets.smile);
          break;
        case "Installing":
          display.image(display.presets.busy);
          break;
        case "Downloading":
          display.image(display.presets.download);
          break;
        case "Starting":
          display.image(display.presets.fwd);
          break;
        case "Stopping":
          display.image(display.presets.stop);
          break;
      }
    });
  });

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
