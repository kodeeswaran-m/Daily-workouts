import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Download,
  Trash2,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchActiveDepartments,
} from "container/store";
import { deleteManyEmployees } from "../../../container/src/store/employeesSlice";


// const departments = ["HR", "Developer", "Insurance", "Finance"];

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const {
    list: employees,
    loading,
    total,
    pages,
    error,
  } = useSelector((state) => state.employees);
  const { activeDepartments } = useSelector((state) => state.departments);

  // Get query params from URL

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialSearch = searchParams.get("search") || "";
  const initialDepartment = searchParams.get("department") || "";
  const initialStatus = searchParams.get("status") || "";

  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);
  const [filterByKeyword, setFilterByKeyword] = useState(initialSearch);
  const [filterDepartment, setFilterDepartment] = useState(initialDepartment);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [showFilter, setShowFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(filterByKeyword);
  const [sortOrder, setSortOrder] = useState(null); // asc | desc | null

  // sort employees client-side
  const handleSortStatus = () => {
    setSortOrder((prev) => {
      if (prev === "asc") return "desc";
      return "asc";
    });
  };
  const sortedEmployees = [...employees];

  if (sortOrder === "asc") {
    sortedEmployees.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortOrder === "desc") {
    sortedEmployees.sort((a, b) => b.status.localeCompare(a.status));
  }

  console.log("Active Departments", activeDepartments);
  // handle input change immediately
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // debounce effect
  useEffect(() => {
    const delay = 500; // milliseconds
    const handler = setTimeout(() => {
      setFilterByKeyword(searchTerm); // triggers API call
      setPage(1); // reset to first page if needed
    }, delay);

    return () => {
      clearTimeout(handler); // clear previous timer
    };
  }, [searchTerm]);

  // Sync state to URL query params
  useEffect(() => {
    const params = {};
    // if (page !== 1) params.page = page;
    params.page = page; // ✅ always keep page in URL
    if (filterByKeyword) params.search = filterByKeyword;
    if (filterDepartment) params.department = filterDepartment;
    if (filterStatus) params.status = filterStatus;
    setSearchParams(params);
  }, [page, filterByKeyword, filterDepartment, filterStatus, setSearchParams]);

  // Fetch employees from backend whenever filters/pagination change
  useEffect(() => {
    dispatch(
      fetchEmployees({
        page,
        limit,
        search: filterByKeyword,
        department: filterDepartment,
        status: filterStatus,
      })
    );
  }, [dispatch, page, limit, filterByKeyword, filterDepartment, filterStatus]);
  useEffect(() => {
    dispatch(fetchActiveDepartments());
  }, []);
  // Toggle single employee selection
  const handleToggleEmployee = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  // Toggle all employees
  const handleToggleAll = (checked, employees) => {
    if (checked) {
      setSelectedIds(employees.map((emp) => emp._id));
    } else {
      setSelectedIds([]);
    }
  };

  // Add or Update Employee
  const handleFormSubmit = async (formData) => {
    if (editingEmployee) {
      await dispatch(
        updateEmployee({ id: editingEmployee._id, data: formData })
      );
    } else {
      const resultAction = await dispatch(createEmployee(formData));
      if (createEmployee.fulfilled.match(resultAction)) {
        const data = resultAction.payload; // API response
        console.log("data", data);
        toast.success(data || `Employee Added successfully`);
      } else {
        toast.error(resultAction.payload || "Failed to Add employee.");
      }
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteEmployee(id));
    console.log("resultAction", resultAction);
    if (deleteEmployee.fulfilled.match(resultAction)) {
      const data = resultAction.payload.message; // API response
      console.log("data", data);
      toast.success(data || `Employee deleted successfully`);
    } else {
      toast.error(resultAction.payload.message || "Failed to delete employee.");
    }
  };

  const handleDeleteAll = async () => {
    const resultAction = await dispatch(deleteManyEmployees(selectedIds));

    if (deleteManyEmployees.fulfilled.match(resultAction)) {
      const data = resultAction.payload.message; // API response
      toast.success(
        data ||
          `${
            data.deletedCount || selectedIds.length
          } employees deleted successfully`
      );
    } else {
      toast.error(
        resultAction.payload.message || "Failed to delete employees."
      );
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="employees-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="employees-header">
        <h2>Employees</h2>
      </div>

      <div className="employees-toolbar">
        <div className="search-filter-group">
          <div className="search-box small">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-dropdown">
            {filterDepartment ? (
              <span className="active-filter">
                {filterDepartment}
                <button
                  className="clear-filter"
                  onClick={() => setFilterDepartment("")}
                >
                  <X size={14} />
                </button>
              </span>
            ) : (
              <button
                className="filter-btn"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <Filter size={16} /> Filter{" "}
                {showFilter ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}

            {showFilter && !filterDepartment && (
              <div className="filter-menu">
                {activeDepartments.map((dept) => (
                  <div
                    key={dept._id}
                    className="filter-item"
                    onClick={() => {
                      setFilterDepartment(dept.name);
                      setShowFilter(false);
                    }}
                  >
                    {dept.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="filter-dropdown">
            {filterStatus ? (
              <span className="active-filter">
                {filterStatus}
                <button onClick={() => setFilterStatus("")}>
                  <X size={14} />
                </button>
              </span>
            ) : (
              <button
                className="filter-btn"
                onClick={() => setShowStatusFilter((prev) => !prev)}
              >
                Status {showStatusFilter ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}

            {showStatusFilter && !filterStatus && (
              <div className="filter-menu">
                {["All", "Active", "Inactive"].map((status) => (
                  <div
                    key={status}
                    className="filter-item"
                    onClick={() => {
                      setFilterStatus(
                        status === "All" ? "" : status.toLowerCase()
                      );
                      setShowStatusFilter(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-actions">
          <button className="count-btn">
            Employees :{" "}
            {employees.length < 10 ? `0${employees.length}` : employees.length}
          </button>
          <button className="icon-btn dwn-btn">
            <Download />
          </button>
          <button className="icon-btn del-btn" onClick={handleDeleteAll}>
            <Trash2 />
          </button>
        </div>

        <div className="toolbar-actions">
          <button className="primary-btn" onClick={handleAdd}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <div className="form-modal" onClick={handleCancelForm}>
          <div
            className="form-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleCancelForm}>
              <X />
            </button>
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      {/* Employee Table */}
      {/* <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onToggleEmployee={handleToggleEmployee}
        onToggleAll={handleToggleAll}
      /> */}

      <EmployeeTable
        employees={sortedEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onToggleEmployee={handleToggleEmployee}
        onToggleAll={handleToggleAll}
        onSortStatus={handleSortStatus}
        sortOrder={sortOrder}
      />

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeesPage;
