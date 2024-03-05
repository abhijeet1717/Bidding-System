# Selecting base docker image
FROM node:18.16.0-alpine

WORKDIR /app/test

COPY package*.json ./

RUN npm i 

COPY . . 

ENV PORT=5050

EXPOSE 5050

# RUN tsc

# run the node app
CMD ["npm", "start"] or node ./dist/index.js

