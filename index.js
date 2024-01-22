const express = require("express");
const connectDB = require("./db/connectDB");
const app = express();

const port = process.env.PORT || 5000;

(async function () {
  await connectDB();
  app.listen(port, () => console.log(`Server is running on port ${port}...`));
})();
