import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyparser.json());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('User Service is running');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`User Service running on port ${process.env.PORT || 3000}`);
});

