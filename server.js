const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("cookie-session");
const passport = require("passport");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport"); // Load OAuth strategies

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
