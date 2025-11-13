const Employee = require("../models/Employee");
const Department = require("../models/Department");
const mongoose = require("mongoose");
const ExcelJS = require("exceljs");

// @desc    Get all employees with filters
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
  try {
    const { after, limit = 50, search = "", department, status } = req.query;
    const query = {};

    // 🔍 Filtering logic
    if (search) {
      query.$or = [
        { employeeId: new RegExp(search, "i") },
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    // 🏢 Department filter
    if (department) {
      const deptDoc = await Department.findOne({ name: department });
      if (!deptDoc) {
        return res.status(400).json({ message: "Invalid department" });
      }
      query.department = deptDoc._id;
    }

    // ⚙️ Status filter
    if (status) query.status = status;

    // 🔁 Cursor logic
    if (after) {
      query._id = { $gt: after };
    }

    // 🧮 Employee count (filtered or total)
    const employeeCount = await Employee.countDocuments({
      ...(search && query.$or ? { $or: query.$or } : {}),
      ...(department ? { department: query.department } : {}),
      ...(status ? { status: query.status } : {}),
    });

    // 📦 Fetch employees for this page
    const employees = await Employee.find(query)
      .populate("department", "name")
      .sort({ _id: 1 })
      .limit(parseInt(limit) + 1);

    // 📍 Pagination info
    const hasMore = employees.length > limit;
    const nextCursor = hasMore ? employees[limit - 1]._id : null;

    // 🧾 Final response
    res.json({
      employees: employees.slice(0, limit),
      nextCursor,
      hasMore,
      employeeCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getEmployees = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = "", department, status } = req.query;

//     const query = {};

//     if (search) {
//       query.$or = [
//         { employeeId: new RegExp(search, "i") },
//         { firstName: new RegExp(search, "i") },
//         { lastName: new RegExp(search, "i") },
//         { email: new RegExp(search, "i") },
//       ];
//     }
//     let deptId = null;
//     if (department) {
//       const deptDoc = await Department.findOne({ name: department });
//       if (!deptDoc)
//         return res.status(400).json({ message: "Invalid department" });
//       deptId = deptDoc._id;
//     }

//     if (department) query.department = deptId;
//     if (status) query.status = status;

//     const employees = await Employee.find(query)
//       .populate("department", "name")
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     const total = await Employee.countDocuments(query);

//     res.json({
//       employees,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// @desc    Get single employee
// @route   GET /api/employees/:id

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("department", "name")
      .populate("manager", "firstName lastName employeeId");
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Get employee by employeeId (not _id)
exports.getEmployeeByEmployeeId = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.empId,
    }).populate("department", "name"); // employeeId field in schema
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create employee
// @route   POST /api/employees
exports.createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      status,
      department,
      jobTitle,
      hireDate,
      employmentType,
    } = req.body;

    // check duplicate email
    const exists = await Employee.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    // check duplicate employeeId
    if (employeeId) {
      const idExists = await Employee.findOne({ employeeId });
      if (idExists)
        return res.status(400).json({ message: "Employee ID already in use" });
    }

    let deptId = null;
    if (department) {
      const deptDoc = await Department.findOne({ name: department });
      if (!deptDoc)
        return res.status(400).json({ message: "Invalid department" });
      deptId = deptDoc._id;
    }

    const employee = await Employee.create({
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      status,
      department: deptId,
      jobTitle,
      hireDate,
      employmentType,
    });

    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $push: { employees: employee._id },
      });
    }

    const populatedEmployee = await Employee.findById(employee._id).populate(
      "department"
    );

    res.status(201).json(populatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id

// exports.updateEmployee = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       firstName,
//       lastName,
//       email,
//       phone,
//       status,
//       department,
//       jobTitle,
//       hireDate,
//       terminationDate,
//       employmentType,
//       manager,
//       dateOfBirth,
//       gender,
//       location,
//       salary,
//       bankAccount,
//       taxId,
//       role,
//       emergencyContacts,
//       skills,
//       notes,
//     } = req.body;

//     let employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Check duplicate email
//     if (email && email !== employee.email) {
//       const emailExists = await Employee.findOne({ email });
//       if (emailExists) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//     }

//     // Check duplicate employeeId
//     if (employeeId && employeeId !== employee.employeeId) {
//       const idExists = await Employee.findOne({ employeeId });
//       if (idExists) {
//         return res.status(400).json({ message: "Employee ID already in use" });
//       }
//     }

//     // Handle department
//     let newDeptId = employee.department;
//     if (department) {
//       const deptDoc = await Department.findOne({ name: department, status: "active" });
//       if (!deptDoc) {
//         return res.status(400).json({ message: "Invalid department" });
//       }
//       newDeptId = deptDoc._id;

//       // Update employees array in Department docs if changed
//       if (
//         employee.department &&
//         employee.department.toString() !== newDeptId.toString()
//       ) {
//         await Department.findByIdAndUpdate(employee.department, {
//           $pull: { employees: employee._id },
//         });
//         await Department.findByIdAndUpdate(newDeptId, {
//           $addToSet: { employees: employee._id },
//         });
//       }
//     }

//     // Handle manager (lookup by employeeId)
//     let managerId = employee.manager;
//     if (manager) {
//       const managerDoc = await Employee.findOne({ employeeId: manager });
//       if (!managerDoc) {
//         return res.status(400).json({ message: "Invalid manager employeeId" });
//       }
//       managerId = managerDoc._id;
//     }

//     // Update fields
//     employee.employeeId = employeeId || employee.employeeId;
//     employee.firstName = firstName || employee.firstName;
//     employee.lastName = lastName || employee.lastName;
//     employee.email = email || employee.email;
//     employee.phone = phone || employee.phone;
//     employee.status = status || employee.status;
//     employee.department = newDeptId;
//     employee.jobTitle = jobTitle || employee.jobTitle;
//     employee.hireDate = hireDate || employee.hireDate;
//     employee.terminationDate = terminationDate || employee.terminationDate;
//     employee.employmentType = employmentType || employee.employmentType;
//     employee.manager = managerId || employee.manager;
//     employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
//     employee.gender = gender || employee.gender;
//     employee.location = location || employee.location;
//     employee.salary = salary || employee.salary;
//     employee.bankAccount = bankAccount || employee.bankAccount;
//     employee.taxId = taxId || employee.taxId;
//     employee.role = role || employee.role;
//     employee.emergencyContacts = emergencyContacts || employee.emergencyContacts;
//     employee.skills = skills || employee.skills;
//     employee.notes = notes || employee.notes;

//     const updated = await employee.save();

//     const populated = await Employee.findById(updated._id)
//       .populate("department", "name")
//       .populate("manager", "firstName lastName employeeId");

//     res.json(populated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      status,
      department,
      jobTitle,
      hireDate,
      terminationDate,
      employmentType,
      manager,
      dateOfBirth,
      gender,
      location,
      salary,
      bankAccount,
      taxId,
      role,
      emergencyContacts,
      skills,
      notes,
    } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check duplicate email
    if (email && email !== employee.email) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists)
        return res.status(400).json({ message: "Email already in use" });
    }

    // Check duplicate employeeId
    if (employeeId && employeeId !== employee.employeeId) {
      const idExists = await Employee.findOne({ employeeId });
      if (idExists)
        return res.status(400).json({ message: "Employee ID already in use" });
    }

    // --- Handle Department ---
    let newDeptId = employee.department;
    if (department) {
      if (mongoose.Types.ObjectId.isValid(department)) {
        // Frontend sent ObjectId
        newDeptId = department;
      } else {
        // Frontend sent department name
        const deptDoc = await Department.findOne({
          name: department,
          status: "active",
        });
        if (!deptDoc)
          return res.status(400).json({ message: "Invalid department" });
        newDeptId = deptDoc._id;
      }

      // Update employees array in Department docs if changed
      if (
        employee.department &&
        employee.department.toString() !== newDeptId.toString()
      ) {
        await Department.findByIdAndUpdate(employee.department, {
          $pull: { employees: employee._id },
        });
        await Department.findByIdAndUpdate(newDeptId, {
          $addToSet: { employees: employee._id },
        });
      }
    }

    // --- Handle Manager ---
    let managerId = employee.manager;
    if (manager) {
      if (mongoose.Types.ObjectId.isValid(manager)) {
        // Frontend sent ObjectId
        managerId = manager;
      } else {
        // Frontend sent employeeId
        const managerDoc = await Employee.findOne({ employeeId: manager });
        if (!managerDoc)
          return res
            .status(400)
            .json({ message: "Invalid manager employeeId" });
        managerId = managerDoc._id;
      }
    }

    // --- Update Fields ---
    employee.employeeId = employeeId || employee.employeeId;
    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.status = status || employee.status;
    employee.department = newDeptId;
    employee.jobTitle = jobTitle || employee.jobTitle;
    employee.hireDate = hireDate || employee.hireDate;
    employee.terminationDate = terminationDate || employee.terminationDate;
    employee.employmentType = employmentType || employee.employmentType;
    employee.manager = managerId || employee.manager;
    employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
    employee.gender = gender || employee.gender;
    employee.location = location || employee.location;
    employee.salary = salary || employee.salary;
    employee.bankAccount = bankAccount || employee.bankAccount;
    employee.taxId = taxId || employee.taxId;
    employee.role = role || employee.role;
    employee.emergencyContacts =
      emergencyContacts || employee.emergencyContacts;
    employee.skills = skills || employee.skills;
    employee.notes = notes || employee.notes;

    const updated = await employee.save();

    // Populate references
    const populated = await Employee.findById(updated._id)
      .populate("department", "name")
      .populate("manager", "firstName lastName employeeId");

    res.json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.deleteOne();

    // Remove from department
    if (employee.department) {
      await Department.findByIdAndUpdate(employee.department, {
        $pull: { employees: employee._id },
      });
    }

    // return res.json({ message: "Employee deleted" });
    return res.json({
      id: req.params.id, // send back deleted id
      message: "Employee deleted Successfully.", // send message
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete multiple employees
// @route   DELETE /api/employees
// @body    { ids: ["id1", "id2", "id3"] }
exports.deleteManyEmployees = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No employee IDs provided" });
    }

    // Find all employees to be deleted
    const employees = await Employee.find({ _id: { $in: ids } });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    // Collect department updates
    const departmentUpdates = employees
      .filter((emp) => emp.department)
      .map((emp) =>
        Department.findByIdAndUpdate(emp.department, {
          $pull: { employees: emp._id },
        })
      );

    // Run department updates in parallel
    await Promise.all(departmentUpdates);

    // Delete employees
    await Employee.deleteMany({ _id: { $in: ids } });

    // res.json({ message: `${employees.length} employees deleted` });
    return res.json({
      ids: req.body.ids, // send back deleted id
      message: `${employees.length} employees deleted`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle employee status
// @route   PATCH /api/employees/:id/status
exports.toggleStatus = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.status = employee.status === "active" ? "inactive" : "active";
    await employee.save();

    res.json({ message: "Status updated", status: employee.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadEmployeesExcel = async (req, res) => {
  try {
    const { department, status } = req.query; // ignore search
    const query = {};

    if (department) {
      const deptDoc = await Department.findOne({ name: department });
      if (deptDoc) query.department = deptDoc._id;
    }

    if (status) query.status = status;

    const employees = await Employee.find(query).populate("department", "name");
    console.log("Employees found for download:", employees.length);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    worksheet.columns = [
      { header: "Employee ID", key: "employeeId", width: 15 },
      { header: "First Name", key: "firstName", width: 15 },
      { header: "Last Name", key: "lastName", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Department", key: "department", width: 20 },
      { header: "Job Title", key: "jobTitle", width: 20 },
      { header: "Status", key: "status", width: 12 },
      { header: "Hire Date", key: "hireDate", width: 15 },
      { header: "Location", key: "location", width: 15 },
    ];

    employees.forEach((emp) => {
      worksheet.addRow({
        employeeId: emp.employeeId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        phone: emp.phone || "",
        department: emp.department?.name || "",
        jobTitle: emp.jobTitle || "",
        status: emp.status,
        hireDate: emp.hireDate
          ? new Date(emp.hireDate).toLocaleDateString("en-IN")
          : "",
        location: emp.location || "",
      });
    });

    // Style header
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0070C0" },
    };

    // Dynamic file name based on filters
    const hasFilter = department || status;
    const fileName = hasFilter
      ? "employees_filter.xlsx"
      : "employees.xlsx";

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel download error:", error);
    if (!res.headersSent)
      res.status(500).json({ message: error.message });
  }
};


