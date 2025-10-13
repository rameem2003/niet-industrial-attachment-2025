const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect(
      "mongodb+srv://niet:niet@cluster0.fzurakz.mongodb.net/niet"
    );
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
