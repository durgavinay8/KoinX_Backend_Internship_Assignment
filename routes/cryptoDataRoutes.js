import { Router } from "express";
import { getStats, getDeviation } from "../controllers/cryptoDataControllers.js";

const router = Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);

export default router;