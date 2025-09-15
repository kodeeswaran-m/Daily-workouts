const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
