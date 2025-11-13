const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteManyEmployees,
  deleteEmployee,
  toggleStatus,
  getEmployeeByEmployeeId,
  downloadEmployeesExcel,
  
} = require("../controllers/employeeController");
const authenticate = require("../middleware/authmiddleware");

const router = express.Router();

// All routes protected
router.get("/download/excel", downloadEmployeesExcel);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/by-empid/:empId", getEmployeeByEmployeeId);


router.delete("/", deleteManyEmployees);
router.patch("/:id/status", toggleStatus);

module.exports = router;
