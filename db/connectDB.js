const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.DATABASE_LOCAL);

const getConnectionURI = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.DATABASE_LOCAL;
  }
  return process.env.DATABASE_PROD;
};

const connectDB = async () => {
  const URI = getConnectionURI();
  try {
    await mongoose.connect(URI, { dbName: "houseHunterDB" });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
