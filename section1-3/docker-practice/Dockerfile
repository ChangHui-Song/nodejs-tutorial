FROM node:18.12.1

WORKDIR /practice/
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . /practice/

CMD yarn dev
