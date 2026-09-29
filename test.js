const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const pool = require("./src/db/pool");

pool
  .query("SELECT NOW()")
  .then((res) => console.log(res.rows))
  .catch((err) => console.error("Connection error", err))
  .finally(() => pool.end());
