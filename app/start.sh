#!/bin/bash

#Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Enable i2c and other interfaces
modprobe i2c-dev || true

# Ensure mopidy folders are there
mkdir /data/mopidy  >/dev/null 2>&1 || true
mkdir /data/mopidy/local  >/dev/null 2>&1 || true
mkdir /data/mopidy/media  >/dev/null 2>&1 || true
mkdir /data/mopidy/playlists  >/dev/null 2>&1 || true

while true; do
    node /usr/src/app/index.js
done
