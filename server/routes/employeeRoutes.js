const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleStatus,
} = require("../controllers/employeeController");
const authenticate = require("../middleware/authmiddleware");

const router = express.Router();

// All routes protected
router.get("/", authenticate, getEmployees);
router.get("/:id", authenticate, getEmployeeById);
router.post("/", authenticate, createEmployee);
router.put("/:id", authenticate, updateEmployee);
router.delete("/:id", authenticate, deleteEmployee);
router.patch("/:id/status", authenticate, toggleStatus);

module.exports = router;
