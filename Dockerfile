FROM node:9.2.1

WORKDIR /poc_nodejs
COPY package.json /poc_nodejs

RUN npm install

COPY . /poc_nodejs
CMD node server.js

EXPOSE 8081