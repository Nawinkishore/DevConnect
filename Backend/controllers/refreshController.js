import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config()

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    try {
        // Find user by refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Check if refresh token expired
        if (user.refreshTokenExpires && user.refreshTokenExpires < new Date()) {
            return res.status(403).json({ message: 'Refresh token expired' });
        }

        // Verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Generate new access token
            const accessToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            

            res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default handleRefreshToken;