#!/bin/env node

{
    const matrix = require(__dirname + '/libs/ht16k33.js');
    const randomIntArray = require('random-int-array');
    const debug = require('debug')('display');

    let display = function() {
        "use strict";
        if (!(this instanceof display)) return new display();

        this.presets = {
            "splash": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "offline": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "stop": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "download": [
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                1, 1, 0, 1, 1, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
            ],

            "fwd": [
                0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 1, 1, 0,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 0, 0, 0,
            ],

            "busy": [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 0, 1, 1, 0, 1, 1,
                1, 1, 0, 1, 1, 0, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
            ],

            "sad": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "smile": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "note": [
                0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 0, 1, 0,
                0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 1, 1, 0, 0, 0,
                0, 1, 0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 1, 0, 0, 0,
                0, 0, 1, 1, 0, 0, 0, 0,
            ],

            "wifi": [
                1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
            ],

            "blank": [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
            ]
        };
        this.blinkToggle = 0;
        this.randomImage = [];

    };

    display.prototype.init = function() {
        "use strict";
        matrix.init();
    };
    display.prototype.image = function(img) {
        "use strict";
        let self = this;
        if (self.blinking) {
            clearInterval(self.blinking);
            self.image(self.presets.blank);
        }
        matrix.writeArray(img.reverse());
        img.reverse();
    };
    display.prototype.startBlink = function(img, interval) {
        'use strict';
        self.blinking = setInterval(() => {
            self.blinkToggle = !self.blinkToggle;
            if (self.blinkToggle) {
                self.image(img);
            } else {
                self.image(self.presets.blank);
            }
        }, interval);
    };
    display.prototype.stopBlink = function(img, interval) {
        'use strict';
        if (self.blinking) {
            clearInterval(self.blinking);
            self.image(self.presets.blank);
        }
    };
    display.prototype.random = function() {
        "use strict";
        let self = this;
        if (self.blinking) {
            clearInterval(self.blinking);
            self.image(self.presets.blank);
        }
        self.randomImage = randomIntArray({
            count: 64,
            max: 2
        });
        self.image(self.randomImage);
    };

    module.exports = display();

}
