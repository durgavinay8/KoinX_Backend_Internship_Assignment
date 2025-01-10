import cron from "node-cron";
import { fetchCryptoData } from "../services/coinGeckoService.js";
import CryptoData from "../models/cryptoDataModel.js";
import mongoose from "mongoose";

cron.schedule("0 */2 * * *", async () => {
  try {
    const rawData = await fetchCryptoData();

    const formattedData = Object.keys(rawData).map((coin) => ({
      crypto_currency: coin,
      price: mongoose.Types.Decimal128.fromString(rawData[coin].usd.toString()),
      market_cap: mongoose.Types.Decimal128.fromString(
        rawData[coin].usd_market_cap.toString()
      ),
      change_24h: mongoose.Types.Decimal128.fromString(
        rawData[coin].usd_24h_change.toString()
      ),
      timestamp: new Date(),
    }));

    await CryptoData.insertMany(formattedData);
    console.log("Crypto data inserted successfully!");
  } catch (error) {
    console.error("Error inserting crypto data: ", error.message);
  }
});