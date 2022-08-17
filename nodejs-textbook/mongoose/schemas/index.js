const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connect(
    'mongodb://root:root@localhost:27017/admin',
    {
      dbName: 'nodejs',
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log('mongodb connected error', error);
      } else {
        console.log('mongodb connected success');
      }
    }
  );
};
mongoose.connection.on('error', (error) => {
  console.error('mongodb connected error', error);
});
mongoose.connection.on('disconnected', () => {
  console.log('mongodb connected disconnected, retry connecting...');
  connect();
});

module.exports = connect;
