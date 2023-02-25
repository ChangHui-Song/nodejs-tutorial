FROM node:18

WORKDIR /api-gateway/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . /api-gateway/

CMD yarn start:dev