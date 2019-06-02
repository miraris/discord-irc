FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

# mount your config.json into /usr/src/app/ using docker run -v /my/path/to/configs:/usr/src/app/
CMD ["node", "lib/index.js", "-c", "/usr/src/app/config.json"]
