const dotenv = require('dotenv').config({ path: __dirname + '/config.env' });
const mongoose = require('mongoose');
//load conf file for environment variables

const app = require('./app');
//log all the env variables
//console.log(process.env);

/**
 * catch every sync exceptions
 * instead of using catch block
 */
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE;
//connect to remote database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('connected to db!');
  });

//START THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
