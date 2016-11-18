#!/bin/bash

blue=$(tput setaf 4)
normal=$(tput sgr0)

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

#Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Enable i2c and other interfaces
modprobe i2c-dev || true

# Ensure mopidy folders are there
mkdir /data/mopidy  >/dev/null 2>&1 || true
mkdir /data/mopidy/local  >/dev/null 2>&1 || true
mkdir /data/mopidy/media  >/dev/null 2>&1 || true
mkdir /data/mopidy/playlists  >/dev/null 2>&1 || true

# Start resin-wifi-connect
node /usr/src/app/wifi_connect.js
if [ ! -f /data/network.config ]; then
	node src/app.js
else
	cp /data/network.config /host/var/lib/connman/network.config
  sleep 20;
  printf "Checking if we are connected to the internet via a google ping...\n\n"
  wget --spider http://google.com 2>&1
  if [ $? -eq 0 ]; then
    printf "\nconnected to internet, skipping wifi-connect\n\n"
  else
		printf "\nnot connected, starting wifi-connect\n\n"
    node src/app.js
  fi
fi

# Start haproxy
service haproxy start >/dev/null 2>&1 || true

node /usr/src/app/index.js
