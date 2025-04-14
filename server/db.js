const mysql = require("mysql2/promise");
require("dotenv").config(); // .env 사용 시

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "pricewing",
});

module.exports = pool;
