import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  Trash,
  Pencil,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/DepartmentsPage.css";
import {
  fetchDepartments,
  deleteDepartment,
  deleteManyDepartments,
} from "container/store"; // adjust path

const DepartmentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: departments,
    loading,
    error,
  } = useSelector((state) => state.departments);

  // Query params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterByKeyword, setFilterByKeyword] = useState(initialSearch);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  // Search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      setFilterByKeyword(searchTerm);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Sync state to URL
  useEffect(() => {
    const params = {};
    if (filterByKeyword) params.search = filterByKeyword;
    if (filterStatus) params.status = filterStatus;
    setSearchParams(params);
  }, [filterByKeyword, filterStatus, setSearchParams]);
  console.log("Department List", departments);
  
  // Fetch departments
  useEffect(() => {
    dispatch(
      fetchDepartments({ search: filterByKeyword, status: filterStatus })
    );
  }, [dispatch, filterByKeyword, filterStatus]);

  // Toggle selection
  // const handleToggleDept = (id) => {
  //   setSelectedIds((prev) =>
  //     prev.includes(id) ? prev.filter((deptId) => deptId !== id) : [...prev, id]
  //   );
  // };

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteDepartment(id));
    if (deleteDepartment.fulfilled.match(resultAction)) {
      toast.success("Department deleted successfully");
    } else {
      toast.error("Failed to delete department");
    }
  };

  // const handleDeleteAll = async () => {
  //   const resultAction = await dispatch(deleteManyDepartments(selectedIds));
  //   if (deleteManyDepartments.fulfilled.match(resultAction)) {
  //     toast.success("Departments deleted successfully");
  //     setSelectedIds([]);
  //   } else {
  //     toast.error("Failed to delete departments");
  //   }
  // };

  return (
    <div className="departments-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
      />
      <div className="departments-header">
        <h2>Departments</h2>
      </div>

      {/* Toolbar */}
      <div className="departments-toolbar">
        <div className="search-filter-group">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            Departments:{" "}
            {departments.length < 10
              ? `0${departments.length}`
              : departments.length}
          </button>
          {/* <button className="icon-btn" onClick={handleDeleteAll}>
            <Trash2 />
          </button> */}
          <button
            className="primary-btn"
            onClick={() => navigate("/addDepartment")}
          >
            <Plus /> Add
          </button>
        </div>
      </div>

      {/* List of departments */}

      <div className="department-list">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && departments.length === 0 && (
          <p>No departments found</p>
        )}

        {departments.map((dept) => (
          <div
            key={dept._id}
            className={`department-card ${
              selectedDept?._id === dept._id ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedDept(dept);
              navigate(`/departmentDetails/${dept._id}`);
            }}
          >
            <div className="dept-info">
              <h4>{dept.name}</h4>
              <span className={`status ${dept.status}`}>{dept.status}</span>
            </div>

            {/* Extra Details */}
            <div className="dept-details">
              <p>
                <strong>Code:</strong> {dept.code || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {dept.description || "No description"}
              </p>
              <p>
                <strong>Location:</strong> {dept.location || "Not specified"}
              </p>
              <p>
                <strong>Employees:</strong> {dept.employees?.length || 0}
              </p>
            </div>

            <div className="dept-actions">
              <button
                className="icon-btn edit-btn small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/editDepartment/${dept._id}`);
                }}
              >
                <Pencil />
              </button>
              <button
                className="icon-btn del-btn small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(dept._id);
                }}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
