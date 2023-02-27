FROM node:18

WORKDIR /auth/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /auth/

CMD yarn start:dev
