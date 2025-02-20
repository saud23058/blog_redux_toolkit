import mongoose from "mongoose";

export async function DBconnection() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      connectTimeoutMS: 10000,
    });
  } catch (error) {
    console.log(`Error occurred while connecting to the DB${error}`);
    process.exit(1);
  }
}
