FROM node:18

WORKDIR /auth/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . ./auth/

CMD yarn start:dev