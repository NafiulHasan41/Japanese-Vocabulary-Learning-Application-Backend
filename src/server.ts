import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import lessonRoutes from "./routes/lessonRoutes";
import vocabularyRoutes from "./routes/vocabularyRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

// Middleware
const corsOptions = {
    origin: ['http://localhost:3000'],
  }
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/vocabularies", vocabularyRoutes);
app.use("/api/users", userRoutes)


// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running... checking');
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
