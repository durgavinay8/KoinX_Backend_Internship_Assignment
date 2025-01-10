import expressAsyncHandler from "express-async-handler";
import supportedCryptoCurrencies from "../config/supportedCryptoCurrencies.js";
import CryptoData from "../models/cryptoDataModel.js";
import { std } from "mathjs";

//@desc Get the latest data about the requested cryptocurrency
//@route GET /api/coin-info/stats
//@access public
export const getStats = expressAsyncHandler(async (req, res) => {
  const data = await CryptoData.findOne({
    crypto_currency: req.query.coin,
  })
    .sort({ timestamp: -1 })
    .exec();
  if (!data) {
    res.status(404);
    throw new Error("No Data Found");
  }

  res.status(200).json({
    price: parseFloat(data.price),
    marketCap: parseFloat(data.market_cap),
    "24hChange": parseFloat(data.change_24h),
  });
});

//@desc Get standard deviation of the price of the requested cryptocurrency for the last 100 records
//@route GET /api/coin-info/deviation
//@access public
export const getDeviation = expressAsyncHandler(async (req, res) => {
  const data = await CryptoData.find({ crypto_currency: req.query.coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select("price -_id")
    .exec();
  if (data.length === 0) {
    res.status(404);
    throw new Error("No Data Found");
  }

  const prices = data.map((item) => parseFloat(item.price));
  const deviation = std(prices);
  res.status(200).json({ deviation });
});