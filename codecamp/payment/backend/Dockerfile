FROM node:18

WORKDIR /practice/
COPY ./package.json .
COPY ./yarn.lock ,

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . /practice/

CMD yarn start:dev