FROM node:18

WORKDIR /practice/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /practice/
RUN yarn build

CMD yarn start:prod
