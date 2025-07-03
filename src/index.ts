import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import routers from "./routers";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use([express.json(), express.urlencoded({ extended: true })]);
app.use(
  cors({
    origin: [
      "https://library-management-b5a4.vercel.app",
      "https://books.mdranju.xyz",
      "http://localhost:5174",
      "http://localhost:5173",
    ], // Or wherever your React app runs
    credentials: true,
  })
);

// Routes
app.use("/api", routers);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello from Express + TypeScript + Mongoose!",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
