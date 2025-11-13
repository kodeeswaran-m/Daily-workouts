import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeFormPage from "./EmployeeFormPage";
import {
  fetchEmployeeById,
  updateEmployee,
  fetchEmployeeByEmployeeId,
} from "container/store";
import { toast } from "react-toastify";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("container/store");
jest.mock("mfe_shared/shared");

jest.mock("../../config/employeeFields", () => ({
  employeeFormPageFields: jest.fn(() => [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email", required: true },
  ]),
  emergencyContactFields: [
    { name: "name", placeholder: "Name" },
    { name: "relation", placeholder: "Relation" },
    { name: "phone", placeholder: "Phone" },
  ],
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("EmployeeFormPage", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ id: "123" });

    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        employees: {
          selected: {
            _id: "123",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            employeeId: "ACE123",
            department: { _id: "dep1" },
            emergencyContacts: [],
            skills: [],
          },
          searchedEmployee: null,
          error: null,
        },
        departments: { activeDepartments: [] },
      })
    );
  });

  test("renders form and heading correctly", () => {
    render(<EmployeeFormPage />);
    expect(screen.getByText("Update Employee")).toBeInTheDocument();
    expect(screen.getByText("Add Contact")).toBeInTheDocument();
    expect(screen.getByText("Add Skill")).toBeInTheDocument();
  });

  test("dispatches fetchEmployeeById on mount when id is present", () => {
    render(<EmployeeFormPage />);
    expect(fetchEmployeeById).toHaveBeenCalledWith("123");
  });

  test("updates field values on change", () => {
    render(<EmployeeFormPage />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { name: "firstName", value: "Jane" } });
    expect(firstNameInput.value).toBe("Jane");
  });

  test("adds and removes emergency contacts", () => {
    render(<EmployeeFormPage />);
    const addBtn = screen.getByText("Add Contact");
    fireEvent.click(addBtn);

    expect(screen.getAllByPlaceholderText("Name").length).toBeGreaterThan(0);

    const removeBtn = screen.getByText("Remove");
    fireEvent.click(removeBtn);

    // after removing one, should still be defined but not throw
    expect(screen.getByText("Add Contact")).toBeInTheDocument();
  });

  test("adds and removes skills", () => {
    render(<EmployeeFormPage />);
    const addSkillBtn = screen.getByText("Add Skill");
    fireEvent.click(addSkillBtn);
    const skillInputs = screen.getAllByPlaceholderText("Skill");
    expect(skillInputs.length).toBeGreaterThan(0);

    const removeBtn = screen.getByText("Remove");
    fireEvent.click(removeBtn);
  });

  test("dispatches updateEmployee and shows toast on valid submit", async () => {
    updateEmployee.mockResolvedValueOnce({ type: "UPDATE_SUCCESS" });

    render(<EmployeeFormPage />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { name: "firstName", value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { name: "email", value: "jane.doe@gmail.com" },
    });

    const submitBtn = screen.getByText("Update Employee");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(updateEmployee).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Employee updated successfully!");
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  test("navigates back when back button clicked", () => {
    render(<EmployeeFormPage />);
    const backBtn = screen.getByRole("button", { name: "" });
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });
});
