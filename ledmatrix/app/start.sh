#!/bin/bash

# Enable i2c and other interfaces
modprobe i2c-dev || true

# Start app
node /usr/src/app/index.js
