const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_DATABASE),
  port: Number(process.env.DB_PORT),
  password: String(process.env.DB_PASSWORD),
});

module.exports = client;
