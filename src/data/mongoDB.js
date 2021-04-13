const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`mongoDB Connected ${(await conn).connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
