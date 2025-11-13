import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, fetchDepartments } from "container/store";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
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
import {
  DASHBOARD_COLORS,
  DEFAULT_FILTERS,
  FETCH_PARAMS,
  CHART_LIMITS,
  CHART_SPECS,
  STATUS,
  LABELS,
} from "../constants/dashboardConstants";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [selectedDept, setSelectedDept] = useState(DEFAULT_FILTERS.DEPARTMENT);
  const [recentView, setRecentView] = useState(DEFAULT_FILTERS.RECENT_VIEW);

  const { list: employees, error: empError } = useSelector(
    (state) => state.employees
  );
  const { list: departments, error: deptError } = useSelector(
    (state) => state.departments
  );

  // Refs for each chart
  const statusRef = useRef();
  const deptRef = useRef();
  const trendRef = useRef();

  // Dropdown state
  const [selectedChart, setSelectedChart] = useState("status");

  // Create separate print hooks (✅ at top level, not inside a function)
  const printStatusChart = useReactToPrint({
    contentRef: statusRef,
    documentTitle: "Status Distribution Chart",
  });

  const printDeptChart = useReactToPrint({
    contentRef: deptRef,
    documentTitle: "Top 5 Departments Chart",
  });

  const printTrendChart = useReactToPrint({
    contentRef: trendRef,
    documentTitle: "Hiring Trend Chart",
  });

  // ✅ This handler just calls the correct print function
  const handleIndividualPrint = () => {
    if (selectedChart === "status") printStatusChart();
    else if (selectedChart === "department") printDeptChart();
    else printTrendChart();
  };

  useEffect(() => {
    dispatch(fetchEmployees(FETCH_PARAMS.EMPLOYEE));
    dispatch(fetchDepartments(FETCH_PARAMS.DEPARTMENT));
  }, [dispatch]);

  // --- Group employees by department ---
  const topDepartmentsStacked = departments
    .map((dept) => {
      const deptEmployees = employees.filter(
        (emp) => emp.department?._id === dept._id
      );
      const active = deptEmployees.filter(
        (emp) => emp.status === STATUS.ACTIVE
      ).length;
      const inactive = deptEmployees.filter(
        (emp) => emp.status === STATUS.INACTIVE
      ).length;
      return { name: dept.name, active, inactive };
    })
    .sort((a, b) => b.active + b.inactive - (a.active + a.inactive))
    .slice(0, CHART_LIMITS.TOP_DEPARTMENTS);

  // --- Filters ---
  const filteredEmployees =
    selectedDept === DEFAULT_FILTERS.DEPARTMENT
      ? employees
      : employees.filter((e) => e.department?._id === selectedDept);

  // --- Stats ---
  const totalEmployees = filteredEmployees.length;
  const totalDepartments = departments.length;
  const activeEmployees = filteredEmployees.filter(
    (e) => e.status === STATUS.ACTIVE
  ).length;
  const inactiveEmployees = filteredEmployees.filter(
    (e) => e.status === STATUS.INACTIVE
  ).length;

  // --- Pie Chart Data ---
  const statusData = [
    { name: "Active", value: activeEmployees },
    { name: "Inactive", value: inactiveEmployees },
  ];

  // --- Recent Hires (Employees) ---
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
    .slice(0, CHART_LIMITS.TOP_DEPARTMENTS);

  // --- Hiring Trend ---
  const hiringTrend = employees.reduce((acc, emp) => {
    const date = new Date(emp.hireDate);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const hiringTrendData = Object.entries(hiringTrend)
    .map(([key, count]) => {
      const [year, month] = key.split("-");
      const date = new Date(year, month - 1);
      const monthName = date.toLocaleString("default", { month: "short" });
      return { month: `${monthName} ${year}`, count };
    })
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  // --- Department Recent Hires (6 months) ---
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - CHART_LIMITS.RECENT_MONTHS);

  const deptRecentHires = departments
    .map((dept) => {
      const deptEmployees = employees.filter(
        (e) => e.department?._id === dept._id
      );
      const total = deptEmployees.length;
      const recent = deptEmployees.filter(
        (e) => new Date(e.hireDate) >= sixMonthsAgo
      ).length;
      return { name: dept.name, total, recent };
    })
    .filter((d) => d.recent > 0)
    .sort((a, b) => b.recent - a.recent);

  // --- Error State ---
  if (empError || deptError) {
    return (
      <div className={styles.errorWrapper}>
        <p>{LABELS.RETRY_MESSAGE}</p>
        <button
          onClick={() => {
            dispatch(fetchEmployees(FETCH_PARAMS.RETRY_EMPLOYEE));
            dispatch(fetchDepartments(FETCH_PARAMS.DEPARTMENT));
          }}
          className={styles.retryBtn}
        >
          {LABELS.RETRY_BUTTON}
        </button>
      </div>
    );
  }

  // --- JSX Render ---
  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboardCard}>
        <h2 className={styles.title}>{LABELS.DASHBOARD_TITLE}</h2>

        {/* Filter */}
        <div className={styles.filterRow}>
          <label htmlFor="deptFilter">{LABELS.FILTER_LABEL}</label>
          <select
            id="deptFilter"
            className={styles.filterSelect}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value={DEFAULT_FILTERS.DEPARTMENT}>All Departments</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {selectedDept === DEFAULT_FILTERS.DEPARTMENT && (
            <div className={styles.statBox}>
              <h3>{totalDepartments}</h3>
              <p>{LABELS.TOTAL.DEPARTMENTS}</p>
            </div>
          )}
          <div className={styles.statBox}>
            <h3>{totalEmployees}</h3>
            <p>{LABELS.TOTAL.EMPLOYEES}</p>
          </div>
          <div className={styles.statBox}>
            <h3>{activeEmployees}</h3>
            <p>{LABELS.TOTAL.ACTIVE}</p>
          </div>
          <div className={styles.statBox}>
            <h3>{inactiveEmployees}</h3>
            <p>{LABELS.TOTAL.INACTIVE}</p>
          </div>
        </div>

        {/* Charts */}
        <div className={styles.chartsRow}>
          <div className={styles.chartBox} ref={statusRef}>
            <h3>{LABELS.STATUS_DISTRIBUTION}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={CHART_SPECS.PIE_RADIUS}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DASHBOARD_COLORS[index % DASHBOARD_COLORS.length]}
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

          {selectedDept === DEFAULT_FILTERS.DEPARTMENT && (
            <>
              <div className={styles.chartBox} ref={deptRef}>
                <h3>{LABELS.TOP_DEPARTMENTS}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={topDepartmentsStacked}
                    margin={CHART_SPECS.MARGIN}
                  >
                    <CartesianGrid strokeDasharray={CHART_SPECS.GRID_DASH} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                    <Bar
                      dataKey="active"
                      stackId="a"
                      fill={DASHBOARD_COLORS[0]}
                      barSize={CHART_SPECS.BAR_SIZE}
                    />
                    <Bar
                      dataKey="inactive"
                      stackId="a"
                      fill={DASHBOARD_COLORS[1]}
                      barSize={CHART_SPECS.BAR_SIZE}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={styles.chartBox} ref={trendRef}>
                <h3>{LABELS.HIRING_TREND}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hiringTrendData}>
                    <CartesianGrid
                      strokeDasharray={CHART_SPECS.GRID_DASH}
                      stroke="#e0e0e0"
                    />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke={DASHBOARD_COLORS[0]}
                      strokeWidth={CHART_SPECS.LINE_STROKE_WIDTH}
                      dot={{
                        r: CHART_SPECS.DOT_RADIUS,
                        fill: DASHBOARD_COLORS[0],
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className={styles.filterSelect}
              style={{ marginRight: "10px" }}
            >
              <option value="status">Status Distribution</option>
              <option value="department">Top 5 Departments</option>
              <option value="trend">Hiring Trend</option>
            </select>
            <button onClick={handleIndividualPrint} className={styles.retryBtn}>
              <Printer /> Print Selected Chart
            </button>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="status">Status Distribution</option>
              <option value="department">Top 5 Departments</option>
              <option value="trend">Hiring Trend</option>
            </select>

            <button onClick={handleIndividualPrint} className={styles.retryBtn}>
              <Printer /> Print Selected Chart
            </button>
          </div>
        </div>

        {/* Recent Hires */}
        <div className={styles.recentHires}>
          <div className={styles.recentHeader}>
            <h3>{LABELS.RECENTLY_HIRED}</h3>
            <select
              value={recentView}
              onChange={(e) => setRecentView(e.target.value)}
              className={styles.recentSelect}
            >
              <option value="employee">{LABELS.EMPLOYEE}</option>
              <option value="department">{LABELS.DEPARTMENT}</option>
            </select>
          </div>

          <div className={styles.tableWrapper}>
            {recentView === "employee" ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{LABELS.TABLE.EMPLOYEE_NAME}</th>
                    <th>{LABELS.TABLE.DEPARTMENT}</th>
                    <th>{LABELS.TABLE.HIRED_DATE}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.map((emp) => (
                    <tr key={emp._id}>
                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>{emp.department?.name || "N/A"}</td>
                      <td>{new Date(emp.hireDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{LABELS.TABLE.DEPARTMENT_NAME}</th>
                    <th>{LABELS.TABLE.OVERALL_EMPLOYEES}</th>
                    <th>{LABELS.TABLE.RECENTLY_HIRED_6M}</th>
                  </tr>
                </thead>
                <tbody>
                  {deptRecentHires.map((dept, idx) => (
                    <tr key={idx}>
                      <td>{dept.name}</td>
                      <td>{dept.total}</td>
                      <td>{dept.recent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
