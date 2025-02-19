import mongoose from "mongoose";

export async function DBconnection() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      connectTimeoutMS: 10000,
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.log(`Error occurred while connecting to the DB${error}`);
    process.exit(1);
  }
}
