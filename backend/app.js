const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const mainRouter = require('./routes/mainRoutes');

const app = express();

//MIDDLE-WARES
//secure http header
app.use(helmet());
//secure against sql injection
app.use(mongoSanitize());
//secure again html injection
app.use(xss());

//if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same API
//max 100 in one hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
//max 10kb in the body of the json
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/infos', mainRouter);

app.all('*', (req, res, next) => {
  res.json({
    status: 'fail',
    message: `${req.originalUrl} is an invalid link`
  });
  next();
});

module.exports = app;
