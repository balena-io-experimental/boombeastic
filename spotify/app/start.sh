#!/bin/bash

# Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Set raspotify to show the device name using resin device name
sed -i -e "s/BoomBeastic/$BALENA_DEVICE_NAME_AT_INIT/g" /etc/default/raspotify
if [ "$SPOTIFY_USERNAME" ] && [ "$SPOTIFY_PASSWORD" ]; then
  sed -i -e "s/#OPTIONS=\"--username <USERNAME> --password <PASSWORD>\"/OPTIONS=\"--username $SPOTIFY_USERNAME --password $SPOTIFY_PASSWORD\"/g" /etc/default/raspotify
fi

# Start cast services
systemctl start raspotify

# Start app
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket node /usr/src/app/index.js
