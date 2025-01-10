import supportedCryptoCurrencies from "../config/supportedCryptoCurrencies.js";

export default function coinQueryParamValidator(req, res, next) {
  const cryptoCurrency = req.query.coin;
  if (!cryptoCurrency) {
    res.status(400);
    throw new Error("Missing coin query parameter");
  }
  if (!supportedCryptoCurrencies.includes(cryptoCurrency)) {
    res.status(400);
    throw new Error("Invalid coin query parameter");
  }

  next();
}
