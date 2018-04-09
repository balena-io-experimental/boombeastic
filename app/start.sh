#!/bin/bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
# Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Set raspotify to show the device name using resin device name
sed -i -e "s/BoomBeastic/$RESIN_DEVICE_NAME_AT_INIT/g" /etc/default/raspotify
if [ "$SPOTIFY_USERNAME" ] && [ "$SPOTIFY_PASSWORD" ]; then
  sed -i -e "s/#OPTIONS=\"--username <USERNAME> --password <PASSWORD>\"/OPTIONS=\"--username $SPOTIFY_USERNAME --password $SPOTIFY_PASSWORD\"/g" /etc/default/raspotify
fi
sed -i -e "s/BoomBeastic/$RESIN_DEVICE_NAME_AT_INIT/g" /usr/local/etc/shairport-sync.conf

# Start cast services
systemctl start shairport-sync
systemctl start raspotify

# Enable i2c and other interfaces
modprobe i2c-dev || true

# let user know we are loading the app
node led_loading.js || true

# resin-wifi-connect
printf "Checking if we are connected to the internet via a google ping...\n\n"
wget --spider http://google.com 2>&1
if [ $? -eq 0 ]; then
  printf "\nconnected to internet, skipping wifi-connect\n\n"
else
  printf "\nnot connected, starting wifi-connect\n\n"
  node led_wifi_connect.js || true
  ./wifi-connect
fi

# Start app
node /usr/src/app/index.js
