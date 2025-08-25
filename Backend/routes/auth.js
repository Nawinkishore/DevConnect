import express from 'express';
import { registerUser,loginUser, logoutUser } from '../controllers/auth.controller.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get('/access', verifyJWT, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});
export default router;