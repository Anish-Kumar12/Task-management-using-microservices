import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/db.connect.js';
import taskRoutes from './routes/task.routes.js';
import { connectRabbitMQ } from './Database/Rabbitmq.connect.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

// Connect to MongoDB
connectDB();
// Connect to RabbitMQ
connectRabbitMQ();
app.listen(process.env.PORT || 3000, () => {
  console.log(`Task service is running on port ${process.env.PORT || 3000}`);
});

