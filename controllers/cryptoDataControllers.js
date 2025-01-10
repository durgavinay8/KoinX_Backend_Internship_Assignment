import supportedCryptoCurrencies from "../config/supportedCryptoCurrencies.js";
import CryptoData from "../models/cryptoDataModel.js";

export const getStats = async (req, res) => {
  const cryptoCurrency = req.query.coin;

  if (!cryptoCurrency) {
    return res.status(400).json({ error: "Missing coin query parameter" });
  }

  if (!supportedCryptoCurrencies.includes(cryptoCurrency)) {
    return res.status(400).json({ error: "Invalid cryptocurrency" });
  }

  try {
    const recentStats = await CryptoData.findOne({
      crypto_currency: cryptoCurrency,
    })
      .sort({ timestamp: -1 })
      .exec();
    if (!recentStats) {
      return res.status(404).json({ error: "No recent stats found" });
    }

    res.json({
      price: parseFloat(recentStats.price),
      marketCap: parseFloat(recentStats.market_cap),
      "24hChange": parseFloat(recentStats.change_24h),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};