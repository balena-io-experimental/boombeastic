{
  const chalk = require("chalk");
  const request = require('request');
  const display = require(__dirname + '/libs/ledmatrix/index.js');
  const supervisor = require(__dirname + '/libs/supervisor/index.js');
  const ShairportReader = require('shairport-sync-reader');
  const pipeReader = new ShairportReader({
    path: '/tmp/shairport-sync-metadata'
  });
  const debug = require('debug')('main');

  pipeReader.on('pbeg', (data) => {
    'use strict';
    display.image(display.presets.shairplay);
    console.log(chalk.cyan('AirPlay stream started'));
    console.dir(data);
  });

  pipeReader.on('pend', (data) => {
    'use strict';
    display.image(display.presets.smile);
    console.log(chalk.yellow('AirPlay stream ended'));
  });

  pipeReader.on('meta', (data) => {
    'use strict';
    console.dir(data);
  });

  pipeReader.on('error', (error) => {
    'use strict';
    console.dir(error);
  });

  // Supervisor
  supervisor.start(500, () => {
    'use strict';
    supervisor.on('status', (status) => {
      console.log(chalk.white('Supervisor status update: ' + status));
      switch (status) {
        case "Idle":
          display.image(display.presets.smile);
          break;
        case "Installing":
          display.image(display.presets.busy);
          break;
        case "Downloading":
          display.image(display.presets.download);
          break;
        case "Starting":
          display.image(display.presets.fwd);
          break;
        case "Stopping":
          display.image(display.presets.stop);
          setTimeout(() => {
            process.exit(1);
          }, 1000);
          break;
      }
    });
  });

}
