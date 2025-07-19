import mongoose from "mongoose";
import User from "../models/UserModel.js";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("database connected successfully");

    //Admin seed gareko
    const adminExist = await User.findOne({ email: "admin@gmail.com" })
    if (adminExist) {
      console.log("Admin already exists.")
    }else{
      await User.create({
        userName: "AdminUser",
        email: "admin@gmail.com",
        password: "admin123",
        role: "ADMIN"
      })
      console.log("Adin seeded successfully!")
    }

  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
