#!/bin/bash

# Remove default audio
rmmod snd_bcm2835  >/dev/null 2>&1 || true

# Set shairport-sync to show the device name using resin device name
sed -i -e "s/BoomBeastic/$RESIN_DEVICE_NAME_AT_INIT/g" /usr/local/etc/shairport-sync.conf

# Start cast service
systemctl start shairport-sync

# Start app
node /usr/src/app/index.js
