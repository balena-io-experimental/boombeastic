#!/bin/env node

{
  const display = require(__dirname + '/libs/ledmatrix/index.js');
  display.init();
  display.image(display.presets.wifi);
}
