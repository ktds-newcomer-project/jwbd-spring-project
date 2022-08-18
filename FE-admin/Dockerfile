FROM node:lts-alpine3.14

WORKDIR /FE-ADMIN

COPY ./package.json /FE-ADMIN

RUN npm install

COPY . /FE-ADMIN

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 3001