FROM balenalib/%%BALENA_MACHINE_NAME%%-node:8-run

# Move to app dir
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
COPY ./app/package.json ./

RUN apt-get update && apt-get install -yq --no-install-recommends \
  build-essential \
  python-dev \
  git \
  curl \
  wget \
  dnsmasq \
  wireless-tools \
  && curl https://api.github.com/repos/balena-io/wifi-connect/releases/latest -s \
      | grep -hoP 'browser_download_url": "\K.*%%RESIN_ARCH%%\.tar\.gz' \
      | xargs -n1 curl -Ls \
      | tar -xvz -C /usr/src/app/ \
  && JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && rm -rf /tmp/* \
  && apt-get purge -y \
    build-essential \
    python-dev \
    git \
    curl \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Move app to filesystem
COPY ./app ./

# Start app
CMD ["bash", "start.sh"]
