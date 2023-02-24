FROM node:18

WORKDIR /resource/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . ./resource/

CMD yarn start:dev