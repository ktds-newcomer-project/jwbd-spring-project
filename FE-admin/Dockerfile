FROM node:lts-alpine3.14

WORKDIR /front-admin

COPY ./package.json /front-admin

RUN npm install

COPY . /front-admin

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 3001