FROM node:12

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN yarn && yarn build

EXPOSE 3000

CMD [ "yarn", "prod:server" ]
