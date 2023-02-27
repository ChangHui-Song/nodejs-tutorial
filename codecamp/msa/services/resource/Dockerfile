FROM node:18

WORKDIR /resource/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /resource/

CMD yarn start:dev