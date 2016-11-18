{
    const fs = require('fs');
    const ini = require('ini');
    const exec = require('child_process').exec;
    const chalk = require("chalk");
    const request = require('request');
    const display = require(__dirname + '/libs/display.js');
    const debug = require('debug')('main');

    let mopidy = ini.parse(fs.readFileSync('/etc/mopidy/mopidy.conf', 'utf-8'));
    console.log(chalk.cyan('configuring Mopidy from env vars...'));
    let updating = false;
    
    // http config
    mopidy.http.port = (process.env.MOPIDY_HTTP_PORT === null) ? "8080" : process.env.MOPIDY_HTTP_PORT;
    // mpd config
    mopidy.mpd.port = (process.env.MOPIDY_MPD_PORT === null) ? "6680" : process.env.MOPIDY_MPD_PORT;
    // audio config
    mopidy.audio.mixer_volume = (process.env.MOPIDY_AUDIO_MIXER_VOLUME === null) ? "50" : process.env.MOPIDY_AUDIO_MIXER_VOLUME;
    // Google Play Music config
    mopidy.gmusic.enabled = (process.env.MOPIDY_GMUSIC_ENABLED === null) ? "false" : process.env.MOPIDY_GMUSIC_ENABLED;
    mopidy.gmusic.username = (process.env.MOPIDY_GMUSIC_USERNAME === null) ? "none" : process.env.MOPIDY_GMUSIC_USERNAME;
    mopidy.gmusic.password = (process.env.MOPIDY_GMUSIC_PASSWORD === null) ? "none" : process.env.MOPIDY_GMUSIC_PASSWORD;
    mopidy.gmusic.all_access = (process.env.MOPIDY_GMUSIC_ALL_ACCESS === null) ? "false" : process.env.MOPIDY_GMUSIC_ALL_ACCESS;
    // Spotify config
    mopidy.spotify.enabled = (process.env.MOPIDY_SPOTIFY_ENABLED === null) ? "false" : process.env.MOPIDY_SPOTIFY_ENABLED;
    mopidy.spotify.username = (process.env.MOPIDY_SPOTIFY_USERNAME === null) ? "none" : process.env.MOPIDY_SPOTIFY_USERNAME;
    mopidy.spotify.password = (process.env.MOPIDY_SPOTIFY_PASSWORD === null) ? "none" : process.env.MOPIDY_SPOTIFY_PASSWORD;
    // Soundcloud config
    mopidy.soundcloud.enabled = (process.env.MOPIDY_SOUNDCLOUD_ENABLED === null) ? "false" : process.env.MOPIDY_SOUNDCLOUD_ENABLED;
    mopidy.soundcloud.auth_token = (process.env.MOPIDY_SOUNDCLOUD_AUTH_TOKEN === null) ? "none" : process.env.MOPIDY_SOUNDCLOUD_AUTH_TOKEN;
    // Soundcloud config
    mopidy.youtube.enabled = (process.env.MOPIDY_YOUTUBE_ENABLED === null) ? "false" : process.env.MOPIDY_YOUTUBE_ENABLED;

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

    setInterval(function keepalive() {
        'use strict';
        request(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/device?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                debug('supervisor', body);
                switch (body.status) {
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
            }
        });
    }, 500);

}
