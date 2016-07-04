# boombeastic
 [WIP] A Raspberry Pi Zero based smart fleet of connected speakers!

### Parts list
please refer to [this link](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/BoM.md)

### Getting started
* Sign up on [resin.io](https://dashboard.resin.io/signup)
* go throught the [getting started guide](http://docs.resin.io/raspberrypi/nodejs/getting-started/) and create a new RPI zero application called `boombeasticmini`
* clone this repository to your local workspace
* set these environment variables in the `Fleet Configuration` application side tab
  * `RESIN_HOST_CONFIG_dtoverlay` = `hifiberry-dac`
* add the *resin remote* to your local workspace using the useful shortcut in the dashboard UI ![remoteadd](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/gitresinremote.png)
* `git push resin master`
* see the magic happening, your device is getting updated Over-The-Air!
### Pictures
![v1](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/20160630_210905.jpg)
