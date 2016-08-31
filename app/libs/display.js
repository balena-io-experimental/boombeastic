#!/bin/env node

(function() {
    'use strict';
    const rpio = require('rpio');
    const matrix = require('8x8matrix');
    const randomIntArray = require('random-int-array');

    let display = function() {
        if (!(this instanceof display)) return new display();

        this.splash = [
            0, 0, 1, 1, 1, 1, 0, 0,
            0, 1, 0, 0, 0, 0, 1, 0,
            1, 0, 1, 0, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 1, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1,
            0, 1, 0, 0, 0, 0, 1, 0,
            0, 0, 1, 1, 1, 1, 0, 0,
        ];

        this.randomImage = [];

    };

    display.prototype.init = function(callback) {
        let self = this;
        matrix.init(rpio);
        callback();
    };
    display.prototype.image = function(img) {
        let self = this;
        matrix.writeArray(img.reverse());
    };
    display.prototype.random = function() {
        let self = this;
        self.randomImage = randomIntArray({
            count: 64,
            max: 1
        });
        self.image(self.randomImage);
    };

    module.exports = display();

})();
