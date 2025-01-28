import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbConnection.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, JavaScript with Express!");
});
app.use("/", userRoutes);
app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
  connectDB();
});
