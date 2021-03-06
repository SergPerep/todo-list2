// PG-object for writing commands to database
const Pool = require("pg").Pool;

// Access to .env variables
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const proConfig ={
    connectionString: process.env.DATABASE_URL // from heroku addons
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;