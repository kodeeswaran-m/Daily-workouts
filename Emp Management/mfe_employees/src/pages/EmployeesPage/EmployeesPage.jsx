import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Download, Trash, X, ArrowUp } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import FilterDropdown from "../../components/FilterDropDown/FilterDropdown";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  deleteManyEmployees,
  fetchActiveDepartments,
  downloadEmployeesExcel,
} from "container/store";
import "../../styles/EmployeesPage.css";
import {
 Spinner
} from "mfe_shared/shared";
const EmployeesPage = () => {
  const dispatch = useDispatch();
  const {
    list: employees,
    nextCursor,
    hasMore,
    loading,
    employeeCount,
  } = useSelector((state) => state.employees);

  const { activeDepartments } = useSelector((state) => state.departments);
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Initialize filters directly from URL
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );

  const [filterDepartment, setFilterDepartment] = useState(
    () => searchParams.get("department") || ""
  );

  const [filterStatus, setFilterStatus] = useState(
    () => searchParams.get("status") || ""
  );

  const [selectedIds, setSelectedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef();
  const loaderRef = useRef();

  // ✅ Sync filters → URL when user changes them
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (filterDepartment) params.department = filterDepartment;
    if (filterStatus) params.status = filterStatus;
    setSearchParams(params);
  }, [searchTerm, filterDepartment, filterStatus, setSearchParams]);

  // ✅ Re-fetch data whenever filters change
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchEmployees({
          after: null,
          limit: 50,
          search: searchTerm,
          department: filterDepartment,
          status: filterStatus,
        })
      );
    }, 300);
    return () => clearTimeout(handler);
  }, [dispatch, searchTerm, filterDepartment, filterStatus]);

  // ✅ Fetch active departments once
  useEffect(() => {
    dispatch(fetchActiveDepartments());
  }, [dispatch]);

  // ✅ Scroll Persistence — Restore on mount
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("employeeScroll");
    if (containerRef.current && savedScroll) {
      // Delay to ensure content rendered before scroll
      setTimeout(() => {
        containerRef.current.scrollTop = parseInt(savedScroll, 10);
      }, 100);
    }
  }, []);

  // ✅ Save scroll position continuously
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        sessionStorage.setItem(
          "employeeScroll",
          containerRef.current.scrollTop
        );
      }
    };
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Infinite scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        dispatch(
          fetchEmployees({
            after: nextCursor || null,
            limit: 50,
            search: searchTerm,
            department: filterDepartment,
            status: filterStatus,
          })
        );
      }
    },
    [
      dispatch,
      hasMore,
      loading,
      nextCursor,
      searchTerm,
      filterDepartment,
      filterStatus,
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: containerRef.current,
      rootMargin: "200px 0px",
      threshold: 0.1,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // 🔹 Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current.scrollTop > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: "auto" });
  };

  // 🔹 Sorting by status
  const handleSortStatus = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const sortedEmployees = [...employees];
  if (sortOrder === "asc") {
    sortedEmployees.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortOrder === "desc") {
    sortedEmployees.sort((a, b) => b.status.localeCompare(a.status));
  }

  // 🔹 Selection handling
  const handleToggleEmployee = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };
  const handleToggleAll = (checked, employees) => {
    setSelectedIds(checked ? employees.map((emp) => emp._id) : []);
  };

  const handleDownloadExcel = async () => {
    const resultAction = await dispatch(
      downloadEmployeesExcel({
        department: filterDepartment,
        status: filterStatus,
      })
    );

    if (downloadEmployeesExcel.fulfilled.match(resultAction)) {
      toast.success("Employees list downloaded successfully");
    } else {
      toast.error("Failed to download employees list");
    }
  };

  // 🔹 Form submission
  const handleFormSubmit = async (formData) => {
    if (editingEmployee) {
      await dispatch(
        updateEmployee({ id: editingEmployee._id, data: formData })
      );
    } else {
      const resultAction = await dispatch(createEmployee(formData));
      if (createEmployee.fulfilled.match(resultAction)) {
        toast.success("Employee added successfully");
      } else {
        toast.error(resultAction.payload || "Failed to add employee");
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
    if (deleteEmployee.fulfilled.match(resultAction)) {
      toast.success("Employee deleted successfully");
    } else {
      toast.error(resultAction.payload?.message || "Failed to delete employee");
    }
  };
  const handleDeleteAll = async () => {
    const resultAction = await dispatch(deleteManyEmployees(selectedIds));
    if (deleteManyEmployees.fulfilled.match(resultAction)) {
      toast.success("Employees deleted successfully");
      setSelectedIds([]);
    } else {
      toast.error("Failed to delete employees");
    }
  };
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="employees-container" style={{ position: "relative" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="employees-header">
        <h2>Employees</h2>
      </div>

      {/* Toolbar */}
      <div className="employees-toolbar">
        <div className="search-filter-group">
          <div className="search-box small">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <FilterDropdown
            activeDepartments={activeDepartments}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterDepartment={filterDepartment}
            setFilterDepartment={setFilterDepartment}
          />
        </div>

        <div className="toolbar-actions">
          <button className="count-btn">
            Employees :{" "}
            {employeeCount < 10 ? `0${employeeCount}` : employeeCount}
          </button>
          <button className="dwn-btn" onClick={handleDownloadExcel}>
            <Download />
          </button>
          <button className="del-btn" onClick={handleDeleteAll}>
            <Trash />
          </button>
        </div>

        <div className="toolbar-actions">
          <button className="primary-btn" onClick={handleAdd}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Form Modal */}
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

      {/* Employee Table with scroll */}
      <div
        ref={containerRef}
        className="scrollable-container"
        style={{ height: "70vh", overflowY: "auto", position: "relative" }}
      >
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

        {/* Loader */}
        <div ref={loaderRef} style={{ textAlign: "center", padding: "1rem" }}>
          {loading ? (
            // <div className="spinner"></div>
            <Spinner/>
          ) : hasMore ? (
            "Scroll for more..."
          ) : (
            "*End of list*"
          )}
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          title="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default EmployeesPage;
