FROM node:18

WORKDIR /auth/
COPY ./package.json /auth/
COPY ./yarn.lock /auth/

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . /auth/

CMD yarn start:dev