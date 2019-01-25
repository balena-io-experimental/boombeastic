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

RUN apt-get update && apt-get install -yq --no-install-recommends \
  apt-transport-https \
  curl \
  alsa-utils \
  && curl -sSL https://dtcooper.github.io/raspotify/key.asc | apt-key add -v - \
  && echo 'deb https://dtcooper.github.io/raspotify jessie main' | tee /etc/apt/sources.list.d/raspotify.list \
  && apt-get update && apt-get install -yq --no-install-recommends raspotify \
  && JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && rm -rf /tmp/* \
  && apt-get purge -y \
    curl \
    apt-transport-https \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure DAC
COPY ./Dockerbin/asound.conf /etc/asound.conf

# Move app to filesystem
COPY ./app ./

# Configure raspotify
COPY ./Dockerbin/raspotify /etc/default/raspotify
RUN systemctl disable raspotify

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
