const express =require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const rateLimit=require('express-rate-limit');

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:"Too many requests from this IP, please try again after 15 minutes"
})
app.use(limiter);
app.use(express.json({extended:true}));

const userRoutes=require('./routes/user');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api/user',userRoutes);
prisma.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const shutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  try {
    await prisma.$disconnect();
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));