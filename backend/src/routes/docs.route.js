import { Router } from "express";
import { addDocs, allDocs } from "../controllers/docs.controller.js";
import {protect} from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/add-docs',addDocs)
router.get('/all-docs',protect,allDocs)

export default router