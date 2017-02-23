#!/bin/env node

{
    const EventEmitter = require('events').EventEmitter;
    const util = require('util');
    const chalk = require('chalk');
    const request = require('request');
    const debug = require('debug')('supervisor');

    // declaring supervisorClient
    let supervisorClient = function() {
        'use strict';
        if (!(this instanceof supervisorClient)) return new supervisorClient();
        this.poll = null;
        this.status = null;
    };
    util.inherits(supervisorClient, EventEmitter);

    supervisorClient.prototype.start = function(interval, callback) {
        'use strict';
        let self = this;
        this.poll = setInterval(() => {
            request(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/device?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    debug('supervisor', body);
                    if (body.status != self.status) {
                        self.status = body.status;
                        self.emit('status', body.status);
                    }
                }
            });
        }, interval);
        callback();
    };

    process.on('SIGTERM', () => {
        'use strict';
        self.emit('status', 'Stopping');
        setTimeout(() => {
            process.exit(1);
        }, 2000);
    });

    supervisorClient.prototype.stop = () => {
        'use strict';
        clearInterval(this.poll);
    };

    module.exports = new supervisorClient();
}
