// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const fs = require("fs");
const certificateRoutes = require("./routes/certificateRoutes");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// simple root
app.get("/", (req, res) => res.send("API is running"));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/certificates", express.static(path.join(__dirname, "certificates")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// error 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
