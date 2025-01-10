import mongoose from "mongoose";

const cryptoDataSchema = new mongoose.Schema({
  crypto_currency: {
    type: String,
    required: [true, "Crypto currency name is missing!"],
    trim: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, "Price of the crypto currency is missing!"],
    min: 0,
  },
  market_cap: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, "MarketCap of the crypto currency is missing!"],
    min: 0,
  },
  change_24h: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, "24 hour change of the crypto currency is missing!"],
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("CryptoData", cryptoDataSchema);
