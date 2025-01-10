import supportedCryptoCurrencies from "../config/supportedCryptoCurrencies.js";
import CryptoData from "../models/cryptoDataModel.js";
import { std } from "mathjs";

export const getStats = async (req, res) => {
  const cryptoCurrency = req.query.coin;

  if (!cryptoCurrency) {
    return res.status(400).json({ error: "Missing coin query parameter" });
  }

  if (!supportedCryptoCurrencies.includes(cryptoCurrency)) {
    return res.status(400).json({ error: "Invalid cryptocurrency" });
  }

  try {
    const data = await CryptoData.findOne({
      crypto_currency: cryptoCurrency,
    })
      .sort({ timestamp: -1 })
      .exec();
    if (!data) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json({
      price: parseFloat(data.price),
      marketCap: parseFloat(data.market_cap),
      "24hChange": parseFloat(data.change_24h),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDeviation = async (req, res) => {
  const cryptoCurrency = req.query.coin;

  if (!cryptoCurrency) {
    return res.status(400).json({ error: "Missing coin query parameter" });
  }

  if (!supportedCryptoCurrencies.includes(cryptoCurrency)) {
    return res.status(400).json({ error: "Invalid cryptocurrency" });
  }

  try {
    const data = await CryptoData.find({ crypto_currency: cryptoCurrency })
      .sort({ timestamp: -1 })
      .limit(100)
      .select("price -_id");
    if (data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    const prices = data.map((item) => parseFloat(item.price));
    const deviation = std(prices);
    res.json({ deviation });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};