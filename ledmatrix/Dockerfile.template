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
  && JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && rm -rf /tmp/* \
  && apt-get purge -y \
    build-essential \
    python-dev \
    git \
    curl \
  && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Move app to filesystem
COPY ./app ./

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
