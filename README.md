# BoomBeastic mini

A Raspberry Pi based smart connected speaker based on [Mopidy](https://github.com/mopidy/mopidy)!
**this application is compatible with resinOS 2.0+**

## Background
*__You can read about the making of the boombeastic and see more photos [here](https://resin.io/blog/the-making-of-boombeastic/)__*
## Parts list
These are the parts you'll need to acquire to assemble the BoomBeastic

## Mini
#### rpi2/2+/3 version
[Bill of materials](https://github.com/resin-io-playground/boombeastic/blob/master/docs/v1/mini/rpi3/bom.md)
#### rpi0 version
[Bill of materials](https://github.com/resin-io-playground/boombeastic/blob/master/docs/v1/mini/rpi0/bom.md)

### Other items you’ll need
Soldering iron
Small pliers
Tiny screwdriver
Diagonal cutters or similar (something to cut small nylon screws)
Wire stripper or knife

## Setting up your Pi

- Sign up for a [resin.io](https://dashboard.resin.io/signup) account
![The resin.io sign up form](img/SignUp.png)
- Create a new resin.io application to manage your Boombeastic
![The resin.io application creation form](img/CreateApp.png)
- Add SSH key
  - More detailed information about the application creation process (including adding a SSH key) is available in the [resin.io getting started guide](http://docs.resin.io/raspberrypi3/nodejs/getting-started/) and create a new Raspberry Pi zero or Raspberry Pi 2/2+/3 application (depending on what Raspberry Pi you have). Name this application whatever you want, e.g. `BoombeasticMini`.
- clone this repository to your local system and open up the Boombeastic project by pasting the following into a terminal<sup>1</sup>:
`git clone https://github.com/resin-io-projects/boombeastic`
`cd boombeastic`
- set these variables in the `Fleet Configuration` application side tab
  - `RESIN_HOST_CONFIG_dtoverlay` = `hifiberry-dac`
  - `RESIN_HOST_CONFIG_device_tree_overlay` = `i2s-mmap`
  - `RESIN_HOST_CONFIG_dtparam` = `audio=off`

![resin.io fleet configuration screen](img/FleetConfig.png)

- add the _resin remote_ to your local workspace using the useful shortcut in the dashboard UI.  Copy and paste the line from the top of your application page into a terminal and run it.
![resin.io git remote line](img/gitRemote.png)
- In your terminal run `git push resin master`.

If you have not pushed code to resin.io before, you may see something like the following:
```
Warning: Permanently added 'git.resin.io,54.165.162.194' (ECDSA) to the list of known hosts.


The authenticity of host 'git.resin.io (54.165.162.194)' can't be established.
ECDSA key fingerprint is SHA256:NfwmqnKId5cx1RWpebbEuuM87bCJbdyhzRnqFES9Nnw.
Are you sure you want to continue connecting (yes/no)?
```
Don't worry!  This is normal and just a security precaution before pushing code for the first time.  Just type `yes` and press enter.  (You won't see this message for subsequent `git push` commands.)

- see the magic happening, your device is getting updated over-the-air (OTA)!

After the OTA is completed, you can test the connection by pointing your browser to `your_boombeastic_ip:80` (get the device IP from the resin dashboard).

## Configuring your Boombeastic 
Next you’re going to hook up your services and make any changes to the default variables.

### Boombeastic Configuration Values
For more about [environment variables](https://docs.resin.io/management/env-vars/)
If you don’t set environment variables, you’ll get the defaults. WHich is fine.


Environment Variable | Default | Description
------------ | ------------- | -------------
MOPIDY_MPD_PORT | `6680` | the port on which expose the [MPD service](https://www.musicpd.org/)
MOPIDY_AUDIO_MIXER_VOLUME | `50` | the default volume
PORTAL_SSID | `ResinAP` | the name of the Access Point that [wifi-connect](https://github.com/resin-io/resin-wifi-connect) spawns if no known WiFi networks are found in order to expose WiFi configuration

**ProTip: you may want to use [resin wifi connect](https://docs.resin.io/deployment/network/#captive-portal-network-setup) if you change wifi network (like if you take this to a friend’s house to finish working on it). It’s a cool little feature that helps if the networks configured on the Pi aren’t available. After checking for known networks and no finding any, it acts access point (setting up a captive portal) which will allow you to connect to it by computer or phone.**

### Music Streaming Services
Now you should enable at least one music streaming service.  Most of these services require an account. Youtube is free and doesn't require authentication.

If you have an account for a service you want to use with your Boombeastic, set the "ENABLED" variable to `true` and put your account information in the "Value" field on the "Environment Variable" section of the dashboard.  If you don't have an account for a particular service or don't want to use it, just skip that service's section.

If you have questions about logging in, because you use a different service to access it, you’ll need to check Mopidy’s documentation for the service. For instance, if you want to know how to access your Spotify account with a Facebook login, you’ll go to the [Spotify extension readme](https://github.com/mopidy/mopidy-spotify)

#### Google Music
Environment Variable | Value | Description
---------------------------  | --------
MOPIDY_GMUSIC_ENABLED | `0` | if set `1` loads the [Google Play Music extension](https://github.com/mopidy/mopidy-gmusic)
MOPIDY_GMUSIC_USERNAME | `none` | your Google username
MOPIDY_GMUSIC_PASSWORD | `none` | your Google Play Music password (an [app password](https://support.google.com/accounts/answer/185833) is suggested as a best practice)
MOPIDY_GMUSIC_ALL_ACCESS | `0` | if set `1` configures the extension for handling the All Access subscription

#### Spotify
Environment Variable | Description
------------ | -------------
MOPIDY_SOUNDCLOUD_ENABLED | `0` | if set `1` loads the [SoundCloud extension](https://github.com/mopidy/mopidy-soundcloud)
MOPIDY_SPOTIFY_USERNAME | `none` | your Spotify username
MOPIDY_SPOTIFY_PASSWORD | `none` | your Spotify password

#### Soundcloud
Environment Variable | Description
------------ | -------------
MOPIDY_SOUNDCLOUD_ENABLED | `true`
MOPIDY_SOUNDCLOUD_AUTH_TOKEN | `none` | your SoundCloud [token](https://www.mopidy.com/authenticate/)

#### Youtube
Environment Variable | Description
------------ | -------------
MOPIDY_YOUTUBE_ENABLED | `0` | if set `1` loads the [YouTube extension](https://github.com/mopidy/mopidy-youtube)

*Note: Mopidy [has other services to use? Point to their vars?] [drives the boombeastic, so it’s a great place to OSS it up.]

## Services

* `http://<boombeasticIP>` or `<resinPublicUrl>` => Mopidy frontend
* `http://<boombeasticIP>/files/` => file manager server ( allows you to manage your local library )
* `http://<boombeasticIP>/emoji/` or `or <resinPublicUrl>/emoji/` => Emoji GUI
* `http://<boombeasticIP>/mpd/` => MPD server ( you can use any MPD client )

## Building the rig
*Notes: See the bill of materials for images of each component part. The wood layers have numbers in their upper left corner.* 

Step 1. Start with the backplate, wooden layer 0 :)

You’ll see the 0 etched into the top left of the wood layer. You’re going to add six nylon hex nuts screws (white plastic maybe link to pic) to the underside of the wood layer, and attach the nuts to the topside, screwing them down all the way. 

*Note: the only holes that won’t have screws bolts are the four most outer corners.*

[img]

*Note: if for whatever reason you took the SD card out of the Pi, now’s a good time to put it in, before you screw all the tiny nylon bolts on.*

Step 2. Place the Pi onto the backplate, over the four screws near the cutout. Screw on four 10mm spacers to hold it in place.

[img]

Step 3. Solder ALL THE THINGS

3a. Solder the screw terminal block and pins to 12S amp breakout. The screw terminal block and pins come with the amp breakout. 

Start with the screw terminal block -- they look like a tiny box with two pins. Orient the terminals so they are on the same side of the wood layer as the other components, at the edge of the wood layer (so you can access them later). Solder the pins.


Next add the set of pins. The Adafruit set of pins we received came with an extra pin, we snapped one off the end before soldering. Check the orientation of the pins before soldering - pins should be sticking up on the same side as the the screw terminals, with the short side of the pins down into the connectors.

3b. Solder the pins on the LED Backpack.  The pins should be oriented so that they are sticking up toward you when you are looking at the chip on the LED Backpack.  (You might also have to snap off extra pins here.)

3c. Connect the LED matrix to the LED Backpack.  BE SURE TO DO THIS THE CORRECT WAY: https://learn.adafruit.com/adafruit-led-backpack/1-2-8x8-matrix

3d. Solder the speaker wires to the speaker.

Step 4. Sit the 12S amp breakout over the two nylon hex nuts in the upper right corner of wood layer 0. Screw on two 10mm spacers to hold the amp breakout in place.

Step 5. Stack wooden layers 1-5.

Step 6. To the faceplate (with the resin logo) install four white nylon screws. Screw heads should be on the side with the printing. Screw down a nut for every screw.

*Note: if the screw heads or nuts block being able to install the LED matrix, take the time to turn the nuts so they’re flush with the cutout, which should allow the LED matrix space.*

Step 7. Sit the LED Backpack over the four white nylon hex nuts, with the pins you soldered on the bottom (relative to the faceplate).

Step 8. Align the speaker over the circular cutout in the faceplate, with the leads facing the closer edge of the back of the faceplate. Insert four nylon screws through the front of the faceplate and speaker frame. Use four black nylon nuts to tighten down.

Step 9. Wire the speaker. 
Remove the red and brown wires from the jumper jerky to use as speaker wire. You’ll need to remove the jumpers from each end and strip the wires. If you have speaker wire, you can use that instead.
Solder dark wire to the – thingie on the speaker
Solder red wire to the + thingie on the speaker

Step 10. Thread the speaker wires through wooden layers 1-5.

Step 11. Wire speaker to the 12S amp breakout on the backplate. Insert the dark wire into the – thingie on the terminal block, tighten the screw. Insert the red wire into the + thingie on the terminal block, tighten the screw.

Step 12. Wire the LED matrix to the Pi
From the jumper jerky peel four wires. You can use the [wiring diagram](https://github.com/resin-io-projects/boombeastic/blob/master/docs/v1/mini/rpi3/assembly.md) to wire the matrix, or this table:

| Wiring diagram color | LED Matrix pin | Raspberry Pi pin |
|----------------------|----------------|------------------|
| red                  | VCC            | 2                |
| black                | GND            | 6                |
| orange               | SDA            | 3                |
| violet               | SCL            | 5                |

Step 13. Wire the amp to the Pi

| Wiring diagram color | Amp pin | Raspberry Pi pin |
|----------------------|---------|------------------|
| red                  | Vin     | 4                |
| black                | GND     | 14               |
| blue                 | DIN     | 40               |
| yellow               | BCLK    | 12               |
| cyan                 | LRC     | 35               |

*Note: the GAIN and SD pins on the amp are not connected.*

Step 14. Now’s a good time to test the wiring, before closing it all up. Boot it up! Do you see a smiley face on the LED matrix? Does it connect to the network? Does it play music without ? If not, now’s a good time to find a wiring issue and fix it.

Step 15. Bolt the layers of wood together. This may take some work to move the wires so the case can close. You can bend the pins (eg. to move the amp jumpers out of the way of the speaker).

Step 16. Kick out the jams.
Go to [resin dashboard] > application > device
Turn on public URL.
From the public URL dropdown, grab the link.
Paste the link in a browser (or share it with your friends!) to start playing music.

Alternative Step 16. Orrrrrr
* To get the device IP, go to [resin dashboard] > application > device
* Get device IP from the Status pane
* Go to http://your_boombeastic_ip

*Note: replace your_boombeastic_ip with the actual IP*


## Advanced
You can use any MPD client pointing it at `your_boombeastic_ip:6680` (the port can be changed using `MOPIDY_MPD_PORT` env var).

## Want to help make this project even better?

Add instructions to tether to your phone using Resin wifi connect.

Add info about how to do more with the LED matrix - at least link to the repo.

Add something else we haven't even thought of yet!

## Assembly

#### rpi2/2+/3 version
please refer to [this link](https://github.com/resin-io-playground/boombeastic/blob/master/docs/v1/mini/rpi3/assembly.md)
#### rpi0 version
please refer to [this link](https://github.com/resin-io-playground/boombeastic/blob/master/docs/v1/mini/rpi0/assembly.md)



### Footnotes

<sup>1</sup> This documentation is assuming you're familiar with the terminal, and have git installed.

## Videos

* [YouTube 1](https://www.youtube.com/watch?v=EnLgmW8kyis)
* [YouTube 2](https://youtu.be/pKvJKaCDQW8)
* [Vine 1](https://vine.co/v/5g71nzHwXvr)

## Pictures

![v1_rpi3_1](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi3/photos/IMG_20160929_163629.jpg)

---

![v1_stereo](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/stereo/rpi3/photos/IMG_20170407_133846.jpg)

---

![v1_rpi3_2](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi3/photos/IMG_20160929_163751.jpg)

---

![v1_rpi3_3](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi3/photos/IMG_20161004_170024.jpg)

---

![v1_stereo](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi0/photos/20160712_005947.jpg)

---

![v1_mono](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi0/photos/20160711_222357.jpg)

---

![v1_battery](https://raw.githubusercontent.com/resin-io-playground/boombeastic/master/docs/v1/mini/rpi0/photos/20160712_150552.jpg)


## License

Copyright 2016 Resinio Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
