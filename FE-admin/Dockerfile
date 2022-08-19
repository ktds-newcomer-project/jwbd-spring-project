FROM node:lts-alpine3.14

WORKDIR /FE-admin

COPY ./package.json /FE-admin

RUN yarn

COPY . /FE-admin

RUN yarn build

CMD ["npx", "serve", "-l", "3001", "-s", "build"]

EXPOSE 3001