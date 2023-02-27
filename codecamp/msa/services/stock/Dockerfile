FROM node:18

WORKDIR /stock/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /stock/

CMD yarn start:dev
