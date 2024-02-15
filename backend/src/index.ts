import "dotenv/config";

import express, { Request, Response } from "express";

import authRoutes from './routes/auth/login'
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/auth/register";

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/test", async (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the STUDENTS HOSTEL BOOKING APP API!!!",
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`The STUDENTS HOSTEL BOOKING APP is running @ ${PORT}`);
});
