FROM node:18

WORKDIR /practice/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /practice/

CMD yarn start:dev