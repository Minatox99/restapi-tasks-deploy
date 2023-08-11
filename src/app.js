import express from "express";
import morgan from "morgan";
import cors from "cors";
import TasksRoutes from "./routes/task.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares

const corsOPtions = {};
app.use(cors(corsOPtions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use("/api/tasks", TasksRoutes);

export default app;
