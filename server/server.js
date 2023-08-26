import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import { protect } from "./src/middleware/accessMiddleware.js";
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";
import todoRoute from "./src/routes/todoRoute.js";
import userRoute from "./src/routes/userRoute.js";
dotenv.config();

const port = process.env.PORT;

const corsOption = {
  origin: ["http://127.0.0.1:5173"],
  credentials: true,
  methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Api-Key",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

connectDB();

const app = express();

app.use(cors(corsOption));
app.use(cookieParser());

// middleware to accept json and send form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/todo", protect, todoRoute);

app.get("/", (req, res) => res.send("Server is running"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
