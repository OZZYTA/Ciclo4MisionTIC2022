# pull base image
FROM node:14.13.1-buster-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm install expo-cli --global

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /usr/src/client && chmod -R 777 /usr/src/client
WORKDIR /usr/src/client
ENV PATH /usr/src/client/.bin:$PATH
ENV NODE_ENV=production
COPY ./package*.json ./
RUN npm install && npm install --only=dev

COPY . .
# copy in our source code last, as it changes the most
# WORKDIR /usr/src/client
# for development, we bind mount volumes; comment out for production
# COPY ./react_native_app .

ENTRYPOINT ["npm", "run"]
CMD ["web"]