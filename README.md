# BoomBeastic mini

[WIP] A Raspberry Pi Zero based smart fleet of connected speakers!

## Parts list

please refer to [this link](https://github.com/resin-io-playground/boombeastic/blob/master/docs/BoM.md)

## Assembly

please refer to [this link](https://github.com/resin-io-playground/boombeastic/blob/master/docs/assembly.md)

## Getting started

- Sign up on [resin.io](https://dashboard.resin.io/signup)
- go throught the [getting started guide](http://docs.resin.io/raspberrypi/nodejs/getting-started/) and create a new RPI zero application called `boombeasticmini`
- clone this repository to your local workspace
- set these environment variables in the `Fleet Configuration` application side tab

  - `RESIN_HOST_CONFIG_dtoverlay` = `hifiberry-dac`

- add the _resin remote_ to your local workspace using the useful shortcut in the dashboard UI ![remoteadd](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/gitresinremote.png)
- `git push resin master`
- see the magic happening, your device is getting updated Over-The-Air!

## Pictures

![v1_stereo](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/photos/20160712_005947.jpg)

---

![v1_mono](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/photos/20160711_222357.jpg)

---

![v1_battery](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/photos/20160712_150552.jpg)

## License

Copyright 2016 Resinio Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
