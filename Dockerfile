FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
ADD package.json /usr/src/app/package.json
ADD client/package.json /usr/src/app/client/package.json
ADD server/package.json /usr/src/app/server/package.json

# Install app dependencies
RUN npm config set registry http://registry.npmjs.org/
RUN npm install --no-optional --production
RUN npm install --no-optional --production --prefix client
RUN npm install --no-optional --production --prefix server

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD npm run start-ci