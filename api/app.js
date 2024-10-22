const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const client = require('./db_config');

const corsOptions = {
  origin: ['http://localhost:3000'],
};

const PORT = process.env.PORT || 3000;

const app = express();

client.connect()
.then(
    () => console.log('Connected to the database'))
.catch(
    (error) => console.error(
        `Error connecting to the database: ${error.message}`)
);

app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}\n`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors(corsOptions));

// Routers
const indexRouter = require('./routes/rooms');

// Routes
app.use('/rooms', indexRouter);

module.exports = app;
