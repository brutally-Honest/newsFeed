const mongoose = require("mongoose");
const dbName = process.env.DB_NAME || "newsFeed";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const db = async () => {
  try {
    await mongoose.connect(`${dbUrl}/${dbName}`);
    console.log("Connected to db", dbName);
  } catch (e) {
    console.log("Error connecting to db");
  }
};
module.exports = db;
