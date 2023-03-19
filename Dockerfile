FROM node:18 as build
WORKDIR /home/node/app

COPY . .

RUN apt-get update -y
RUN yarn

CMD ["node", "index.js"]