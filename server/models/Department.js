const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    // Basic info
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, unique: true, trim: true }, // e.g. "DEP001"
    description: { type: String },

    // Leadership
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    assistantManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    // Org details
    location: { type: String, trim: true },
    budget: { type: Number },
    establishedDate: { type: Date },

    // Relationships
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    parentDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    subDepartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    // Performance / HR
    goals: [{ type: String }],
    currentProjects: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "inactive", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

departmentSchema.pre("save", async function (next) {
  if (!this.code) {
    const count = await mongoose.model("Department").countDocuments();
    this.code = `DEP${(count + 1).toString().padStart(3, "0")}`; 
    // e.g., DEP001, DEP002, DEP010
  }
  next();
});

module.exports = mongoose.model("Department", departmentSchema);



// const mongoose = require("mongoose");

// const departmentSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true, trim: true },
//     description: { type: String },
//     employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Department", departmentSchema);
