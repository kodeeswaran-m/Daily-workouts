// constants/dashboardConstants.js

export const DASHBOARD_COLORS = ["#8347ad", "#acacacff"];

export const DEFAULT_FILTERS = {
  DEPARTMENT: "all",
  RECENT_VIEW: "employee",
};

export const FETCH_PARAMS = {
  EMPLOYEE: { page: 1, limit: 1000 },
  RETRY_EMPLOYEE: { page: 1, limit: 100 },
  DEPARTMENT: {},
};

export const CHART_LIMITS = {
  TOP_DEPARTMENTS: 5,
  RECENT_MONTHS: 6,
};

export const CHART_SPECS = {
  PIE_RADIUS: 110,
  BAR_SIZE: 30,
  LINE_STROKE_WIDTH: 3,
  DOT_RADIUS: 5,
  GRID_DASH: "3 3",
  MARGIN: { top: 20, right: 20, left: 20, bottom: 40 },
};

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const LABELS = {
  DASHBOARD_TITLE: "Employee Dashboard",
  FILTER_LABEL: "Filter by Department:",
  RETRY_MESSAGE: "Failed to load dashboard data.",
  RETRY_BUTTON: "Retry",
  STATUS_DISTRIBUTION: "Status Distribution",
  TOP_DEPARTMENTS: "Top 5 Departments by Employee Count",
  HIRING_TREND: "Hiring Trend",
  RECENTLY_HIRED: "Recently Hired",
  EMPLOYEE: "Employees",
  DEPARTMENT: "Departments",
  TABLE: {
    EMPLOYEE_NAME: "Employee Name",
    DEPARTMENT: "Department",
    HIRED_DATE: "Hired Date",
    DEPARTMENT_NAME: "Department Name",
    OVERALL_EMPLOYEES: "Overall Employees",
    RECENTLY_HIRED_6M: "Recently Hired (6 months)",
  },
  TOTAL: {
    DEPARTMENTS: "Total Departments",
    EMPLOYEES: "Total Employees",
    ACTIVE: "Active Employees",
    INACTIVE: "Inactive Employees",
  },
};
