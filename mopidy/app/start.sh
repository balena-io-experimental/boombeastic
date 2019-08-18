#!/bin/bash

# Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Ensure mopidy folders are there
mkdir -p /data/mopidy/local >/dev/null 2>&1 || true
mkdir /data/mopidy/media >/dev/null 2>&1 || true
mkdir /data/mopidy/playlists >/dev/null 2>&1 || true
mkdir /data/mopidy/cache >/dev/null 2>&1 || true

# Ensure mopidy folders are accessible to the mopidy user
chown -R mopidy:audio /data/mopidy

# Scan media files
mopidyctl local scan

# Start app
node /usr/src/app/index.js
