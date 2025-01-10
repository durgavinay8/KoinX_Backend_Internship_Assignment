import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
