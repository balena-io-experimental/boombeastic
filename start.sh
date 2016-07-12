#!/bin/bash

#Remove default audio
rmmod snd_bcm2835

# Enable i2c and other interfaces
modprobe i2c-dev || true
modprobe i2c-bcm2708 || true
modprobe snd-soc-pcm512x || true
modprobe snd-soc-wm8804 || true

# Ensure mopidy folders are there
mkdir /data/mopidy > /dev/null 2>&1 || true
mkdir /data/mopidy/local > /dev/null 2>&1 || true
mkdir /data/mopidy/media > /dev/null 2>&1 || true
mkdir /data/mopidy/playlists > /dev/null 2>&1 || true

while true; do
    node /app/index.js
done
