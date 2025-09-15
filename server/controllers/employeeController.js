const Employee = require("../models/Employee");
const Department = require("../models/Department");

// @desc    Get all employees with filters
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", departmentId, status } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    if (departmentId) query.department = departmentId;
    if (status) query.status = status;

    const employees = await Employee.find(query)
      .populate("department", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    res.json({
      employees,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("department", "name");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create employee
// @route   POST /api/employees
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, status, department } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      phone,
      status,
      department,
    });

    // Add employee to department (optional)
    if (department) {
      await Department.findByIdAndUpdate(department, {
        $push: { employees: employee._id },
      });
    }

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, status, department } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.status = status || employee.status;
    employee.department = department || employee.department;

    const updated = await employee.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.deleteOne();

    // Remove from department
    if (employee.department) {
      await Department.findByIdAndUpdate(employee.department, {
        $pull: { employees: employee._id },
      });
    }

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle employee status
// @route   PATCH /api/employees/:id/status
exports.toggleStatus = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    employee.status = employee.status === "active" ? "inactive" : "active";
    await employee.save();

    res.json({ message: "Status updated", status: employee.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
