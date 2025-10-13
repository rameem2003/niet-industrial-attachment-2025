const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://niet:niet@cluster0.vwhjzbx.mongodb.net/niet"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
