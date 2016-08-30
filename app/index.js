(function() {
    'use strict';

    const fs = require('fs');
    const ini = require('ini');
    const exec = require('child_process').exec;
    const chalk = require("chalk");
    const request = require('request');

    let mopidy = ini.parse(fs.readFileSync('/etc/mopidy/mopidy.conf', 'utf-8'));
    console.log(chalk.cyan('configuring Mopidy from env vars...'));

    // http config
    mopidy.http.port = (process.env.MOPIDY_HTTP_PORT == null) ? "8080" : process.env.MOPIDY_HTTP_PORT;

    // mpd config
    mopidy.mpd.port = (process.env.MOPIDY_MPD_PORT == null) ? "6680" : process.env.MOPIDY_MPD_PORT;

    // audio config
    mopidy.audio.mixer_volume = (process.env.MOPIDY_AUDIO_MIXER_VOLUME == null) ? "50" : process.env.MOPIDY_AUDIO_MIXER_VOLUME;

    // Google Play Music config
    mopidy.gmusic.enabled = (process.env.MOPIDY_GMUSIC_ENABLED == null) ? "false" : process.env.MOPIDY_GMUSIC_ENABLED;
    mopidy.gmusic.username = (process.env.MOPIDY_GMUSIC_USERNAME == null) ? "none" : process.env.MOPIDY_GMUSIC_USERNAME;
    mopidy.gmusic.password = (process.env.MOPIDY_GMUSIC_PASSWORD == null) ? "none" : process.env.MOPIDY_GMUSIC_PASSWORD;
    mopidy.gmusic.all_access = (process.env.MOPIDY_GMUSIC_ALL_ACCESS == null) ? "false" : process.env.MOPIDY_GMUSIC_ALL_ACCESS;
    // Spotify config
    mopidy.spotify.enabled = (process.env.MOPIDY_SPOTIFY_ENABLED == null) ? "false" : process.env.MOPIDY_SPOTIFY_ENABLED;
    mopidy.spotify.username = (process.env.MOPIDY_SPOTIFY_USERNAME == null) ? "none" : process.env.MOPIDY_SPOTIFY_USERNAME;
    mopidy.spotify.password = (process.env.MOPIDY_SPOTIFY_PASSWORD == null) ? "none" : process.env.MOPIDY_SPOTIFY_PASSWORD;
    // Soundcloud config
    mopidy.soundcloud.enabled = (process.env.MOPIDY_SOUNDCLOUD_ENABLED == null) ? "false" : process.env.MOPIDY_SOUNDCLOUD_ENABLED;
    mopidy.soundcloud.auth_token = (process.env.MOPIDY_SOUNDCLOUD_AUTH_TOKEN == null) ? "none" : process.env.MOPIDY_SOUNDCLOUD_AUTH_TOKEN;
    // Soundcloud config
    mopidy.youtube.enabled = (process.env.MOPIDY_YOUTUBE_ENABLED == null) ? "false" : process.env.MOPIDY_YOUTUBE_ENABLED;

    fs.writeFileSync('/etc/mopidy/mopidy.conf', ini.stringify(mopidy));
    console.log(chalk.cyan('starting Mopidy - HTTP port:' + mopidy.http.port + '; MPD port:' + mopidy.mpd.port));
    exec('systemctl start mopidy', (error, stdout, stderr) => {
        if (error) {
            console.log(chalk.red(`exec error: ${error}`));
            return;
        }
        console.log(chalk.green(`stdout: ${stdout}`));
        console.log(chalk.red(`stderr: ${stderr}`));
    });

    setInterval(function keepalive() {

    }, 60000);

})();
