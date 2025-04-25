// Imports
import express from 'express';
import dotenv from 'dotenv';
import { globalError } from './middleware/errorMiddleware.mjs';
import connectDB from './db/conn.mjs';
import produceRoutes from './routes/produceRoutes.mjs';

// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/produce', produceRoutes);

// ErrMiddleware
app.use(globalError);

// Listener
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
