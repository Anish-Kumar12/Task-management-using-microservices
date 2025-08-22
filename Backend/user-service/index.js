import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/db.connect.js';
import userRoutes from './routes/user.route.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

// Connect to MongoDB
connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`User Service running on port ${process.env.PORT || 3000}`);
});

