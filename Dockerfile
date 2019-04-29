FROM node:8

RUN echo "deb [check-valid-until=no] http://archive.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN sed -i '/deb http:\/\/deb.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update

RUN apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -o Acquire::Check-Valid-Until=false update && apt-get install -y yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
ADD package.json /usr/src/app/package.json
ADD server/package.json /usr/src/app/server/package.json

# Install app dependencies
RUN yarn install --no-optional --production

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD rm -f /usr/src/app/server/newrelic/newrelic.js; cp /usr/src/app/server/newrelic/newrelic.js.$APP_ENV /usr/src/app/server/newrelic.js; yarn server-$APP_ENV;
