require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");


const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: true, credentials: true })); // Enable CORS for all routes with credentials support
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/uploads", express.static("uploads")); // Serve static files from the "uploads" directory



// health check
app.get("/", (req, res) => res.send("API running ✅"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  console.log("✅ Routes mounted: /api/auth and /api/user");

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
