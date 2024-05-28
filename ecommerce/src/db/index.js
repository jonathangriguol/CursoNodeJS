import mongoose from "mongoose";
import config from "../configs/db.config.js";

export const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.db_user}:${config.db_pass}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("db error");
  }
};
