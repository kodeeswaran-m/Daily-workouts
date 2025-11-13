const Department = require("../models/Department");
const Employee = require("../models/Employee");

// @desc    Get all departments
// @route   GET /api/departments
// Controller
exports.getDepartments = async (req, res) => {
  try {
    const { search = "", status } = req.query;

    const query = {};

    // Search by name, code, description
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { code: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const departments = await Department.find(query).populate(
      "employees",
      "firstName lastName email phone status"
    );

    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get department by ID
// @route   GET /api/departments/:id
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate(
      "employees",
      "firstName lastName email employeeId status jobTitle"
    );
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new department
// @route   POST /api/departments
// exports.createDepartment = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const exists = await Department.findOne({ name });
//     if (exists)
//       return res.status(400).json({ message: "Department already exists" });

//     const department = await Department.create({ name, description });
//     res.status(201).json(department);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.createDepartment = async (req, res) => {
  try {
    let {
      name,
      code,
      description,
      manager,
      assistantManager,
      location,
      budget,
      establishedDate,
      parentDepartment,
      subDepartments,
      goals,
      currentProjects,
      status,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // Fix: Convert empty strings to undefined/null for ObjectId fields
    manager = manager && manager !== "" ? manager : null;
    assistantManager = assistantManager && assistantManager !== "" ? assistantManager : null;
    parentDepartment = parentDepartment && parentDepartment !== "" ? parentDepartment : null;

    // If subDepartments comes as `[""]`, clean it
    if (Array.isArray(subDepartments)) {
      subDepartments = subDepartments.filter((id) => id && id !== "");
    }

    // Check if department with same name/code already exists
    const exists = await Department.findOne({ $or: [{ name }, { code }] });
    if (exists) {
      return res.status(400).json({ message: "Department with same name/code already exists" });
    }

    const department = new Department({
      name,
      code,
      description,
      manager,
      assistantManager,
      location,
      budget: budget ?? null,
      establishedDate: establishedDate ? new Date(establishedDate) : null,
      parentDepartment,
      subDepartments,
      goals: goals && goals.length ? goals : [],
      currentProjects: currentProjects && currentProjects.length ? currentProjects : [],
      status: status || "active",
    });

    const savedDept = await department.save();
    res.status(201).json(savedDept);
  } catch (error) {
    console.error("Create Department Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// @desc    Update department
// @route   PUT /api/departments/:id
// exports.updateDepartment = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const department = await Department.findById(req.params.id);
//     if (!department) return res.status(404).json({ message: "Department not found" });

//     department.name = name || department.name;
//     department.description = description || department.description;

//     const updated = await department.save();
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateDepartment = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      manager,
      assistantManager,
      location,
      budget,
      establishedDate,
      parentDepartment,
      subDepartments,
      goals,
      currentProjects,
      status,
    } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update only if provided, else keep old values
    department.name = name || department.name;
    department.code = code || department.code;
    department.description = description || department.description;
    department.manager = manager || department.manager;
    department.assistantManager =
      assistantManager || department.assistantManager;
    department.location = location || department.location;
    department.budget = budget !== undefined ? budget : department.budget;
    department.establishedDate = establishedDate || department.establishedDate;
    department.parentDepartment =
      parentDepartment || department.parentDepartment;
    department.subDepartments = subDepartments || department.subDepartments;
    department.goals = goals && goals.length ? goals : department.goals;
    department.currentProjects =
      currentProjects && currentProjects.length
        ? currentProjects
        : department.currentProjects;
    department.status = status || department.status;

    const updated = await department.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    // Optionally unassign employees
    await Employee.updateMany(
      { department: department._id },
      { $unset: { department: "" } }
    );

    await department.deleteOne();

    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign employee to department
// @route   POST /api/departments/:id/assign
exports.assignEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const department = await Department.findById(req.params.id);
    const employee = await Employee.findById(employeeId).populate("department");

    if (!department || !employee) {
      return res
        .status(404)
        .json({ message: "Department or Employee not found" });
    }

    // ✅ If employee is already in a department
    if (employee.department) {
      // If it's NIAD → allow re-assignment
      if (employee.department.name === "NIAD") {
        // Move employee to new department
        employee.department = department._id;
        await employee.save();

        // Remove from NIAD.employees
        await Department.findByIdAndUpdate(employee.department._id, {
          $pull: { employees: employee._id },
        });

        // Add to target department
        if (!department.employees.includes(employee._id)) {
          department.employees.push(employee._id);
          await department.save();
        }

        return res.json({
          message: "Employee reassigned from NIAD",
          department,
        });
      }

      // ❌ Already in another department → Block assignment
      return res.status(400).json({
        message: `Employee is already in ${employee.department.name}. Please unassign first.`,
      });
    }

    // ✅ If employee has no department (edge case)
    employee.department = department._id;
    await employee.save();

    if (!department.employees.includes(employee._id)) {
      department.employees.push(employee._id);
      await department.save();
    }

    res.json({ message: "Employee assigned successfully", department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unassign employee from department
// @route   POST /api/departments/:id/unassign
exports.unassignEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const department = await Department.findById(req.params.id);
    const employee = await Employee.findById(employeeId);

    if (!department || !employee) {
      return res
        .status(404)
        .json({ message: "Department or Employee not found" });
    }

    // ✅ Remove from Employee if currently in this department
    if (
      employee.department &&
      employee.department.toString() === department._id.toString()
    ) {
      // 🔎 Find or Create NIAD department
      let niadDept = await Department.findOne({ name: "NIAD" });
      if (!niadDept) {
        niadDept = new Department({
          name: "NIAD",
          description: "Not In Any Department",
          status: "active",
        });
        await niadDept.save();
      }

      // Update employee department → NIAD
      employee.department = niadDept._id;
      await employee.save();

      // ✅ Add employee to NIAD department if not already there
      if (!niadDept.employees.includes(employee._id)) {
        niadDept.employees.push(employee._id);
        await niadDept.save();
      }
    }

    // ✅ Remove from old department.employees array
    department.employees = department.employees.filter(
      (id) => id.toString() !== employee._id.toString()
    );
    await department.save();

    res.json({
      message: "Employee unassigned from department and moved to NIAD",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch all active departments (only name field)
exports.getActiveDepartmentNames = async (req, res) => {
  try {
    const departments = await Department.find({ status: "active" })
      .select("name") // fetch only the name field
      .lean();

    res.status(200).json(departments);
  } catch (error) {
    console.log("error : ",error.message);
    res.status(500).json({ message: error.message });
  }
};