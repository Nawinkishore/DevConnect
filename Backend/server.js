import express from 'express';
import connect from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import refresh from './routes/refresh.js';
import verifyJWT from './middleware/verifyJWT.js';
import profileRouter from './routes/profile.js';
const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

await connect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use('/api/auth',authRouter)
app.use('/api/refresh',refresh)
app.use(verifyJWT);

// Other Api routes

//Profile routes
app.use('/api/profile',profileRouter)