FROM node:14-slim

WORKDIR /usr/src/app/client

COPY ./package*.json types.tsx App.tsx app.json ./

RUN npm install expo-cli --global
RUN npm install

COPY . .

CMD [ "npm", "web" ]