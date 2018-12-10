#!/bin/env node

{
  const EventEmitter = require('events').EventEmitter;
  const util = require('util');
  const chalk = require('chalk');
  const request = require('request');
  const _ = require('lodash');
  const debug = require('debug')('supervisor');
  const appname = process.env.BALENA_APP_NAME;
  let self;
  // declaring supervisorClient
  let supervisorClient = function() {
    'use strict';
    if (!(this instanceof supervisorClient)) return new supervisorClient();
    this.poll = null;
    this.status = null;
    self = this;
  };
  util.inherits(supervisorClient, EventEmitter);

  supervisorClient.prototype.start = function(interval, callback) {
    'use strict';
    this.poll = setInterval(() => {
      request(process.env.RESIN_SUPERVISOR_ADDRESS + '/v2/applications/state?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          debug('supervisor', body);

          if (self.filterServicesWithStatus(body[appname].services, "Downloading")) {
            if (self.status != "downloading") {
              self.status = "downloading";
              self.emit('status', "downloading");
            }
          } else if (self.filterServicesWithStatus(body[appname].services, "Running")) {
            if (self.status != "idle") {
              self.status = "idle";
              self.emit('status', "idle");
            }
          } else if (self.filterServicesWithStatus(body[appname].services, "exited")) {
            if (self.status != "stopping") {
              self.status = "stopping";
              self.emit('status', "stopping");
            }
          }
        }
      });
    }, interval);
    callback();
  };

  process.on('SIGTERM', () => {
    'use strict';
    self.emit('status', 'Stopping');
  });

  supervisorClient.prototype.stop = () => {
    'use strict';
    clearInterval(this.poll);
  };

  supervisorClient.prototype.filterServicesWithStatus = (services, status) => {
    'use strict';
    let servicesCheck = _.filter(services, (service) => service.status === status);
    return servicesCheck.length;
  };

  module.exports = new supervisorClient();
}
