#!/bin/bash

#Remove default audio
rmmod snd_bcm2835 || true

# Enable i2c and other interfaces
modprobe i2c-dev || true

# Ensure mopidy folders are there
mkdir /data/mopidy || true
mkdir /data/mopidy/local || true
mkdir /data/mopidy/media || true
mkdir /data/mopidy/playlists || true

while true; do
    node /app/index.js
done
