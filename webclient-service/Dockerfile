FROM node:12 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn && yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
