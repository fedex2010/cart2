FROM node:8

RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

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
CMD yarn server-ci