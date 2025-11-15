import { Router } from "express";
import { aiResponse } from "../controllers/ai.controller.js";

const router = Router()

router.post('/chatbot',aiResponse)

export default router