import express from "express";
import { calculateMortgage } from "../controllers/mortgageController";

const router = express.Router();

router.post("/calculate-mortgage", calculateMortgage);

export default router;