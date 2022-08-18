FROM node:lts-alpine3.14

WORKDIR /FE

COPY ./package.json /FE

RUN npm install

COPY . /FE

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 3000