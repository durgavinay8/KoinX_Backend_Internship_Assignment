import { Router } from "express";
import {
  getStats,
  getDeviation,
} from "../controllers/cryptoDataControllers.js";
import coinQueryParamValidator from "../middlewares/coinQueryParamValidator.js";

const router = Router();

router.use(coinQueryParamValidator);

router.get("/stats", getStats);
router.get("/deviation", getDeviation);

export default router;