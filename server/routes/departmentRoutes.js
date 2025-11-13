const express = require("express");
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  assignEmployee,
  unassignEmployee,
  getActiveDepartmentNames,
} = require("../controllers/departmentController");
const authenticate = require("../middleware/authmiddleware");

const router = express.Router();

// All routes protected
router.get("/", getDepartments);
router.get("/active", getActiveDepartmentNames);
router.get("/:id", getDepartmentById);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);
router.post("/:id/assign", assignEmployee);
router.post("/:id/unassign", unassignEmployee);

module.exports = router;
