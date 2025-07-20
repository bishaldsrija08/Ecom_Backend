import mongoose from "mongoose";
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'

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
        password: await bcrypt.hashSync("admin123", 10),
        role: "ADMIN"
      })
      console.log("Adin seeded successfully!")
    }

  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;