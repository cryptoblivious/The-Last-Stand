import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import players from './routes/players';

const app = express();
mongoose.set('strictQuery', false);
dotenv.config();
const port: string = process.env.PORT?.toString() ?? '';
const mongoUri: string = process.env.MONGO_URI?.toString() ?? '';

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Dummy route
app.get('/', (req, res) => {
  res.json({ msg: 'Hello World!' });
});

// Routes
app.use('/api/players', players);

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log(`Server started, connected to db and listening on port`);
    });
  })
  .catch((err) => console.log(err));
