#!/bin/env node

{
    const i2c = require('i2c');
    const debug = require('debug')('ht16k33');

    let ht16k33 = function() {
        'use strict';
        if (!(this instanceof ht16k33)) return new ht16k33();
        this.address = (process.env.LED_MATRIX_I2C_ADDRESS == null) ? 0x70 : parseInt(process.env.LED_MATRIX_I2C_ADDRESS);
        this.brightness = (process.env.LED_MATRIX_BRIGHTNESS == null) ? 15 : parseInt(process.env.LED_MATRIX_BRIGHTNESS);
        this.bus = (process.env.LED_MATRIX_I2C_BUS == null) ? '/dev/i2c-1' : process.env.LED_MATRIX_I2C_BUS;
        this.write_buffer = [];
        this.current_array = [];
        this.wire = new i2c(this.address, {
            device: this.bus
        });
    };

    ht16k33.prototype.init = function() {
        'use strict';
        let self = this;

        // Turn on the oscillator
        self.wire.write(Buffer([(0x20 | 0x01)]), (err) => {

        });

        // Turn display on
        self.wire.write(Buffer([(0x01 | 0x80)]), (err) => {

        });

        // Clear
        for (var x = 0; x < 16; x++) {
            self.wire.write(Buffer([x, 0]), (err) => {
                debug(err);
            });
        }

        // Set display brightness.
        self.wire.write(Buffer([(self.brightness)]), (err) => {
            debug(err);
        });
    };

    ht16k33.prototype.setLED = function(y, x, value) {
        'use strict';
        let self = this;
        var led = y * 16 + ((x + 7) % 8);

        var pos = Math.floor(led / 8);
        var offset = led % 8;


        if (value)
            self.write_buffer[pos] |= (1 << offset);
        else
            self.write_buffer[pos] &= ~(1 << offset);
    };

    ht16k33.prototype.writeArray = function(_array) {
        'use strict';
        let self = this;
        self.current_array = _array;
        self.clearBuffer();

        var x = 0;
        var y = 0;

        for (var i in _array) {
            self.setLED(y, x, _array[i]);

            x++;

            if (x >= 8) {
                y++;
                x = 0;
            }

        }

        self.writeBuffer();
    };

    ht16k33.prototype.writeAnimation = function(_array, speed) {
        'use strict';
        var self = this;
        var old_buffer = self.write_buffer.slice();

        for (var i in _array) {
            self.writeAnimation2(i, _array[i], speed);
        }

        setTimeout(function() {

            self.clearBuffer();
            self.writeBuffer();

        }, _array.length * speed + speed);

        setTimeout(function() {

            self.write_buffer = old_buffer.slice();
            self.writeBuffer();

        }, _array.length * speed + 1000);
    };

    ht16k33.prototype.writeAnimation2 = function(i, data, speed) {
        'use strict';
        var self = this;

        setTimeout(function() {
            self.writeArray(data);
        }, speed * i);
    };

    ht16k33.prototype.writeBuffer = function() {
        'use strict';
        let self = this;
        for (var i in self.write_buffer) {
            self.wire.write(Buffer([i, self.write_buffer[i]]), (err) => {
                if (err) {

                }
            });
        }
    };

    ht16k33.prototype.clearBuffer = function() {
        'use strict';
        let self = this;
        for (var i in self.write_buffer) {
            self.write_buffer[i] = 0;
        }
    };


    module.exports = ht16k33();
}
