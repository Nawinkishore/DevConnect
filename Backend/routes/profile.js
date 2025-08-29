import express from "express";
import { getProfileById,updateProfile } from "../controllers/profile.controller.js";
const router = express.Router()

router.get('/id',getProfileById)
router.put('/edit/id',updateProfile)

export default router;