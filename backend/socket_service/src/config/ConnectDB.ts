import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_DB_URL!);
    // const db1 = db.useDb("Anime");
    // console.log(db1);
    console.log("connect DB");
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
