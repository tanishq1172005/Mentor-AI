import { Router } from "express";
import {protect} from '../middlewares/auth.middleware.js'
import { registerUser,loginUser,getUser } from "../controllers/user.controller.js";

const router = Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getUser)

export default router