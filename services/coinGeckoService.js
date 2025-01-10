import axios from "axios";
import supportedCryptoCurrencies from "../config/supportedCryptoCurrencies.js";

export const fetchCryptoData = async () => {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${supportedCryptoCurrencies.join(
      ","
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data", error.message);
  }
};