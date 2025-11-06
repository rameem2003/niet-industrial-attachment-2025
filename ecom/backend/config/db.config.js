const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
