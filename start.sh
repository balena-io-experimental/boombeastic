#!/bin/bash

# Ensure mopidy folders are there
mkdir /data/mopidy > /dev/null 2>&1 || true
mkdir /data/mopidy/local > /dev/null 2>&1 || true
mkdir /data/mopidy/media > /dev/null 2>&1 || true
mkdir /data/mopidy/playlists > /dev/null 2>&1 || true

while true; do
    node /app/index.js
done
