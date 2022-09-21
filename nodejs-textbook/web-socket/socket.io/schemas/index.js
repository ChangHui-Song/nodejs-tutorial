const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(
    MONGO_URL,
    {
      dbName: 'gifchat',
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log('MongoDB Connected Error', error);
      } else {
        console.log('MongoDB Connected Success');
      }
    }
  );
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB Connected Error');
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected MongoDB, Retry Connecting');
  connect();
});

module.exports = connect;
