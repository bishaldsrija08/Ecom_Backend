import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
