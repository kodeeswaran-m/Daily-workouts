import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import EmployeeForm from "./EmployeeForm";

// Mock redux selector to provide activeDepartments
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock employeeFields from config
jest.mock("../../config/employeeFields", () => ({
  employeeFields: jest.fn(() => [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email", required: true },
  ]),
}));

// Mocks from mfe_shared/shared (handled by __mocks__)
jest.mock("mfe_shared/shared");

describe("EmployeeForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    useSelector.mockReturnValue({ activeDepartments: [] });
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  test("renders form fields correctly", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("calls onSubmit with form data when valid", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John", name: "firstName" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe", name: "lastName" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com", name: "email" },
    });

    fireEvent.click(screen.getByText("Add Employee"));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      })
    );
  });

  test("disables submit button when required fields are empty", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);
    const submitBtn = screen.getByText("Add Employee");
    expect(submitBtn).toBeDisabled();
  });

  test("calls onCancel when cancel button is clicked", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
