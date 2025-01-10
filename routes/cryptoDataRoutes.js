import { Router } from "express";
import { getStats } from "../controllers/cryptoDataControllers.js";

const router = Router();

router.get("/stats", getStats);

export default router;