import 'dotenv/config'; // Load env vars FIRST - trigger restart
import express from 'express';
import cors from 'cors';
import prisma from './config/prisma.js';

import productRoutes from './routes/productRoutes.js';
import cmsRoutes from './routes/cmsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from the React frontend
app.use(express.json({ limit: '200mb' })); 
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Database Connection check
const checkDB = async () => {
  try {
    await prisma.$connect();
    console.log(`PostgreSQL Connected Successfully via Prisma!`);
  } catch (error) {
    console.error(`Error connecting to PostgreSQL: ${error.message}`);
    console.log(`Make sure your PostgreSQL service is running and DATABASE_URL is correct.`);
  }
};

checkDB();

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/orders', orderRoutes);

// Basic Route to verifying server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the IkeNation Clothing API!',
    status: 'Running',
    database: 'PostgreSQL',
    version: '1.0.0'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`=================================`);
});
