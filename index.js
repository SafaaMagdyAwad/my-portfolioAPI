import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import messageRouter from './routes/messageRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

app.use(express.json());



app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow Postman
    const allowedOrigins = [
      "http://localhost:5173",
      "https://my-portfolio-rose-two-78.vercel.app",
    ];
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy: origin ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
  methods: ["GET","POST","PATCH","DELETE","OPTIONS","PUT"]
}));
app.use(express.urlencoded({ extended: true })); // optional, parses form data


// test route
app.get("/", (req, res) => {
  res.send("Test route works");
});

// routes
app.use('/api/messages',messageRouter)
app.use('/api/auth',authRouter)

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err));

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// FIX: Use export default instead of module.exports
export default app;