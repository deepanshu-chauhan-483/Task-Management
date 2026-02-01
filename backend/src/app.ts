import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/task.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
