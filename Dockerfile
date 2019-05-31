FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install && \
    npm run build

# mount your config.json into /usr/src/app/configs using docker run -v /my/path/to/configs:/usr/src/app/configs
CMD ["npm", "start", "--", "--config", "/usr/src/app/configs/config.json"]
