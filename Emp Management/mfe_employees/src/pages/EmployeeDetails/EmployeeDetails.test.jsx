import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmployeeDetailsPage from "./EmployeeDetailsPage";

// ✅ Mock react-router-dom hooks
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

// ✅ Mock Redux hooks
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

// ✅ Mock actions
jest.mock("container/store", () => ({
  fetchEmployeeById: (id) => ({ type: "FETCH_EMP_BY_ID", payload: id }),
  clearSelected: () => ({ type: "CLEAR_SELECTED" }),
}));

describe("EmployeeDetailsPage Component", () => {
  const mockEmployee = {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9999999999",
    department: { name: "IT" },
    jobTitle: "Developer",
    status: "Active",
    location: "Chennai",
    hireDate: "2024-10-10T00:00:00Z",
    employmentType: "Full-Time",
    salary: "80000",
    role: "Engineer",
    skills: ["React", "Node.js"],
    emergencyContacts: [{ name: "Jane", relation: "Wife", phone: "9876543210" }],
    notes: "Excellent performer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ id: "1" });
  });

  afterEach(cleanup);

  test("renders loading state", () => {
    useSelector.mockReturnValue({ loading: true, error: null, selected: null });

    render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading employee/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: "Something went wrong",
      selected: null,
    });

    render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/⚠️/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("returns null when no employee data", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      selected: null,
    });

    const { container } = render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  test("dispatches fetchEmployeeById on mount and clearSelected on unmount", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      selected: mockEmployee,
    });

    const { unmount } = render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: "FETCH_EMP_BY_ID", payload: "1" });

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_SELECTED" });
  });

  test("renders employee details correctly", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      selected: mockEmployee,
    });

    render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/developer/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText(/it/i)).toBeInTheDocument();
    expect(screen.getByText(/₹80000/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/excellent performer/i)).toBeInTheDocument();
  });

  test("navigates to /employees when back button clicked", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      selected: mockEmployee,
    });

    render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/employees");
  });

  test("renders fallback text when missing fields", () => {
    const incompleteEmp = { ...mockEmployee, phone: "", department: null, skills: [], emergencyContacts: [] };
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      selected: incompleteEmp,
    });

    render(
      <MemoryRouter>
        <EmployeeDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/no skills added/i)).toBeInTheDocument();
    expect(screen.getByText(/no emergency contacts/i)).toBeInTheDocument();
    expect(screen.getAllByText(/N\/A/i).length).toBeGreaterThan(0);
  });
});
