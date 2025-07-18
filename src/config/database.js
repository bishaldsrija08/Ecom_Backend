import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ecommerce0toHero:ecommerce0toHero@cluster0.vepwrcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
