const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: "AWD36214.",
  host: "localhost",
  port: 5432,
  database: "taskify",
});

module.exports = pool;
