const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

const port = 3000;

// ==============================
// CONNECT MONGODB
// ==============================

connectDB();

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.send("We are open, looking for sotruzz");
});

// ==============================
// NOTE ROUTES
// ==============================

app.use("/api/notes", noteRoutes);

// ==============================
// START SERVER
// ==============================

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});