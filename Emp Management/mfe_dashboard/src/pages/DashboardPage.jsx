import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, fetchDepartments } from "container/store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import styles from "../styles/Dashboard.module.css";

const COLORS = ["#8347ad", "#acacacff"];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [selectedDept, setSelectedDept] = useState("all");

  const {
    list: employees,
    loading: empLoading,
    error: empError,
  } = useSelector((state) => state.employees);
  const {
    list: departments,
    loading: deptLoading,
    error: deptError,
  } = useSelector((state) => state.departments);

  console.log("departments : ", departments);

  useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit: 100 }));
    dispatch(fetchDepartments({}));
  }, [dispatch]);
  // Group employees by department
  const deptCounts = departments.map((d) => {
    const count = employees.filter((e) => e.department?._id === d._id).length;
    return { name: d.name, count };
  });

  // // Sort and take top 5
  // const topDepartments = deptCounts
  //   .sort((a, b) => b.count - a.count)
  //   .slice(0, 5);

  const topDepartmentsStacked = departments
    .map((d) => {
      const deptEmployees = employees.filter(
        (e) => e.department?._id === d._id
      );
      const active = deptEmployees.filter((e) => e.status === "active").length;
      const inactive = deptEmployees.filter(
        (e) => e.status === "inactive"
      ).length;
      return { name: d.name, active, inactive };
    })
    .sort((a, b) => b.active + b.inactive - (a.active + a.inactive))
    .slice(0, 5);

  const filteredEmployees =
    selectedDept === "all"
      ? employees
      : employees.filter((e) => e.department?._id === selectedDept);

  const totalEmployees = filteredEmployees.length;
  const totalDepartments = departments.length;
  const activeEmployees = filteredEmployees.filter(
    (e) => e.status === "active"
  ).length;
  const inactiveEmployees = filteredEmployees.filter(
    (e) => e.status === "inactive"
  ).length;

  const statusData = [
    { name: "Active", value: activeEmployees },
    { name: "Inactive", value: inactiveEmployees },
  ];

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
    .slice(0, 5);

  // hiring trend by hireDate
  const hiringTrend = employees.reduce((acc, emp) => {
    const date = new Date(emp.hireDate);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const hiringTrendData = Object.entries(hiringTrend).map(([month, count]) => ({
    month,
    count,
  }));

  if (empError || deptError) {
    return (
      <div className={styles.errorWrapper}>
        <p>⚠️ Failed to load dashboard data.</p>
        <button
          onClick={() => {
            dispatch(fetchEmployees({ page: 1, limit: 100 }));
            dispatch(fetchDepartments({}));
          }}
          className={styles.retryBtn}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboardCard}>
        <h2 className={styles.title}>Employee Dashboard</h2>

        {/* Filter */}
        <div className={styles.filterRow}>
          <label htmlFor="deptFilter">Filter by Department:</label>
          <select
            id="deptFilter"
            className={styles.filterSelect}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {selectedDept === "all" && (
            <div className={styles.statBox}>
              <h3>{totalDepartments}</h3>
              <p>Total Departments</p>
            </div>
          )}
          <div className={styles.statBox}>
            <h3>{totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
          <div className={styles.statBox}>
            <h3>{activeEmployees}</h3>
            <p>Active Employees</p>
          </div>
          <div className={styles.statBox}>
            <h3>{inactiveEmployees}</h3>
            <p>Inactive Employees</p>
          </div>
        </div>

        {/* Charts */}
        <div className={styles.chartsRow}>
          <div className={styles.chartBox}>
            <h3>Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h3>Top 5 Departments by Employee Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topDepartmentsStacked}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="active" stackId="a" fill="#8347ad" barSize={30}/>
                <Bar dataKey="inactive" stackId="a" fill="#acacacff" barSize={30}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h3>Hiring Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hiringTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8347ad"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#8347ad" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Hires */}
        <div className={styles.recentHires}>
          <h3>Recently Hired Employees</h3>
          <ul>
            {recentEmployees.map((emp) => (
              <li key={emp._id}>
                <span className={styles.empName}>
                  {emp.firstName} {emp.lastName}
                </span>{" "}
                <span className={styles.empDept}>
                  {emp.department?.name || "N/A"}
                </span>{" "}
                <span className={styles.empDate}>
                  ({new Date(emp.hireDate).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
