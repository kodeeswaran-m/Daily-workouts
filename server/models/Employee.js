const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    // Employment details
    jobTitle: { type: String, trim: true },
    hireDate: { type: Date },
    terminationDate: { type: Date },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "intern"],
      default: "full-time",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", 
    },

    // Personal info
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    // Work details
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    location: { type: String, trim: true }, // office/site

    // Payroll / HR
    salary: { type: Number },
    bankAccount: { type: String, trim: true },
    taxId: { type: String, trim: true },

    // System usage
    status: {
      type: String,
      enum: ["active", "inactive", "terminated", "on-leave"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },

    // Extras
    emergencyContacts: [
      {
        name: String,
        relation: String,
        phone: String,
      },
    ],
    skills: [{ type: String, trim: true }],
    notes: { type: String },
  },
  { timestamps: true }
);

// Optional: Auto-generate employeeId if not provided
employeeSchema.pre("save", async function (next) {
  if (!this.employeeId) {
    const count = await mongoose.model("Employee").countDocuments();
    this.employeeId = `ACE${(count + 1).toString().padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
