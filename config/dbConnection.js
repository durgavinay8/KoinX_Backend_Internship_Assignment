import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log(
      `Database Connected:- host:${connect.connection.host} name:${connect.connection.name}`
    );
  } catch (err) {
    console.error("Databbase Connection Error: ", err);
  }
};