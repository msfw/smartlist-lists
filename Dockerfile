FROM node:13.12.0-alpine3.11
WORKDIR /usr/lists/src
COPY ./package*.json ./
RUN npm install
COPY . /usr/lists
CMD ["npm", "start"]