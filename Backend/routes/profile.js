import express from "express";
import { getProfileById, updateProfile } from "../controllers/profile.controller.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Get profile by userId
router.get('/me', getProfileById);

// Update profile by userId
router.put('/editProfile',upload.fields([{name:'bannerImage'},{name:'image'}]), updateProfile);

export default router;
