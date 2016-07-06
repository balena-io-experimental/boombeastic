#!/bin/bash

# Ensure mopidy folders are there
mkdir /data/mopidy || true
mkdir /data/mopidy/local || true
mkdir /data/mopidy/media || true
mkdir /data/mopidy/playlists || true

while true; do
    node /app/index.js
done
