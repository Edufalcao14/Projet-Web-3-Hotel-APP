const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const client = require('./db/db_config');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const path = require('path');

const corsOptions = {
  origin: ['http://localhost:3000'],
};

const PORT = process.env.PORT || 3000;

const app = express();

// Database connection
client.connect()
.then(
    () => console.log('\nConnected to the database\n'))
.catch(
    (error) => console.error(
        `\nError connecting to the database: ${error.message}`)
);

// Documentation configuration
const options = {
  info: {
    version: '0.1.0',
    title: 'Vinci Hotel API',
    description: 'Vinci Hotel API Documentation',
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
};
expressJSDocSwagger(app)(options);

// View engine setup
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routers
const indexRouter = require('./routes/index-route');
const roomsRouter = require('./routes/rooms-route');
const financeRouter = require('./routes/finance-route');
const reservationsRouter = require('./routes/reservations-route');

// Routes
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/finance', financeRouter);
app.use('/reservations', reservationsRouter);

// Run the server
app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}.\n
  API URL : http://localhost:${PORT}\n
  Documentation URL : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;