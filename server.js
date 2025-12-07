import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./src/config/connectMongodb.js"
import authRoutes from "./src/features/users/user.router.js"
import taskRoutes from "./src/features/todos/todo.routes.js"
import { protect } from "./src/middleware/auth.js";


const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", protect, taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
