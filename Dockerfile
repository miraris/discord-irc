#FROM node:4-onbuild
FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

#COPY dir:bcd0c6ae1599559148a2ec3a5188a42c673e227623420dc457bd659e054df898 in /usr/src/app/

RUN npm run build

CMD ["npm", "start", "--", "--config", "/usr/src/app/configs/config.json"]
