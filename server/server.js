const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cookieParser());
app.use(morgan("dev"));
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true, // allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"], // 👈 add this
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
