import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import "./tasks/fetchCryptoDataJob.js";
import cryptoDataRoutes from "./routes/cryptoDataRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDb();

// Routes
app.use("/api", cryptoDataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});