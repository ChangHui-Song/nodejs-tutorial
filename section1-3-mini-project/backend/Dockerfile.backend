FROM node:18.12.1

WORKDIR /project/

COPY ./package.json .

RUN yarn install

COPY . /project/

CMD yarn dev