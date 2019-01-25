FROM balenalib/%%BALENA_MACHINE_NAME%%-node:8-run

# Install Systemd
ENV container docker
RUN apt-get update && apt-get install -y --no-install-recommends \
		systemd-sysv \
	&& rm -rf /var/lib/apt/lists/*

# We never want these to run in a container
# Feel free to edit the list but this is the one we used
RUN systemctl mask \
    dev-hugepages.mount \
    sys-fs-fuse-connections.mount \
    sys-kernel-config.mount \

    display-manager.service \
    getty@.service \
    systemd-logind.service \
    systemd-remount-fs.service \

    getty.target \
    graphical.target

COPY systemd/entry.sh /usr/bin/entry.sh
COPY systemd/balena.service /etc/systemd/system/balena.service

RUN systemctl enable /etc/systemd/system/balena.service

STOPSIGNAL 37
ENTRYPOINT ["/usr/bin/entry.sh"]
ENV INITSYSTEM on
# Finish setup systemd

# Move to app dir
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
COPY ./app/package.json ./

# Add Mopidy sources and install apt deps
RUN apt-get update && apt-get install -yq --no-install-recommends wget \
  && wget -q -O - https://apt.mopidy.com/mopidy.gpg | sudo apt-key add - \
  && wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/jessie.list \
  && apt-get update && apt-get install -yq --no-install-recommends \
    git \
    build-essential \
    python-dev \
    python-pip \
    python-wheel \
    libxml2-dev \
    libz-dev \
    libxslt1-dev \
    alsa-utils \
    autoconf \
    automake \
    libtool \
    libdaemon-dev \
    libasound2-dev \
    libpopt-dev \
    libconfig-dev \
    gstreamer1.0-alsa \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-tools \
    gstreamer1.0-libav \
    mopidy \
  && JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && rm -rf /tmp/* \
  && pip install --upgrade setuptools \
  && pip install packaging pyparsing youtube-dl \
  && pip install \
      mopidy-gmusic \
      Mopidy-YouTube \
      mopidy-musicbox-webclient \
      Mopidy-Local-SQLite \
  && apt-get purge -y \
    build-essential \
    python-dev \
    python-pip \
    git \
    curl \
    libxml2-dev \
    libxslt1-dev \
    autoconf \
    automake \
    libtool \
    libdaemon-dev \
    libasound2-dev \
    libpopt-dev \
    libconfig-dev \
    libz-dev \
  && apt-get autoremove -y \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure Mopidy
COPY ./Dockerbin/mopidy.conf /etc/mopidy/mopidy.conf

# Configure DAC
COPY ./Dockerbin/asound.conf /etc/asound.conf

# Move app to filesystem
COPY ./app ./

# Disable mopidy service - we will manually start it later
RUN systemctl disable mopidy

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
