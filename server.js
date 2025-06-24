// server.js
import express from 'express';
import router from './routes/user.routes.js';
import contactRouter from './routes/contact.routes.js';
import productRouter from './routes/product.routes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

// Main API routes
app.use('/api/user', router);
app.use('/api/contact', contactRouter);
app.use('/api/product', productRouter)

// Start server only after MongoDB connects
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connected');

    
    app.listen(8000, () => {
      console.log(`🚀 Server is running on http://127.0.0.1:8000`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
