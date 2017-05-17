#!/bin/env node

{
  const display = require(__dirname + '/libs/ledmatrix/index.js');
  if (parseInt(process.env.NOLEDMATRIX)) {
    return true;
  }
  display.init();
  display.image(display.presets.wifi);
}
