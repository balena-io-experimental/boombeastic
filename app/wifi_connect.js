#!/bin/env node

{
    const display = require(__dirname + '/libs/ledmatrix/index.js');
    const debug = require('debug')('wificonnect');

    display.init(() => {
        'use strict';
        display.image(display.presets.wifi);
    });
}
