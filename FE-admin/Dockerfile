FROM node:lts-alpine3.14

WORKDIR /FE-admin

COPY ./package.json /FE-admin

RUN npm install

COPY . /FE-admin

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 4400