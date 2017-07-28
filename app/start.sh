#!/bin/bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Enable i2c and other interfaces
modprobe i2c-dev || true

# let user know we are loading the app
node led_loading.js || true

# Ensure mopidy folders are there
mkdir -p /data/mopidy/local >/dev/null 2>&1 || true
mkdir /data/mopidy/media >/dev/null 2>&1 || true
mkdir /data/mopidy/playlists >/dev/null 2>&1 || true
mkdir /data/mopidy/cache >/dev/null 2>&1 || true

# Ensure mopidy folders are accessible to the mopidy user
chown -R mopidy:audio /data/mopidy

echo "Attaching hci0..."
if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
    echo "First try failed. Let's try another time."
    /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -
fi

hciconfig hci0 up
hciconfig hci0 sspmode 1
hciconfig hci0 piscan

# resin-wifi-connect
sleep 1 # Delay needed to avoid DBUS introspection errors
printf "Checking if we are connected to the internet via a google ping...\n\n"
wget --spider http://google.com 2>&1
if [ $? -eq 0 ]; then
  printf "\nconnected to internet, skipping wifi-connect\n\n"
else
  printf "\nnot connected, starting wifi-connect\n\n"
  node led_wifi_connect.js || true
  node src/app.js --clear=true
fi

# Start haproxy
service haproxy start >/dev/null 2>&1 || true

/usr/src/app/bluez-agent.py &

# Start bluetooth
#service bluetooth start >/dev/null 2>&1 || true

# Start pulseaudio
#service pulseaudio.service start >/dev/null 2>&1 || true

node /usr/src/app/index.js
