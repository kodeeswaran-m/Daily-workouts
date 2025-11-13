import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeRow from "./EmployeeRow";

describe("EmployeeRow Component", () => {
  const mockEmployee = {
    _id: "123",
    name: "John Doe",
    department: "Engineering",
    status: "Active",
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleEmployee = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders employee details correctly", () => {
    render(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleEmployee={mockOnToggleEmployee}
        selected={false}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("renders selected state correctly", () => {
    const { container } = render(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleEmployee={mockOnToggleEmployee}
        selected={true}
      />
    );

    const row = container.querySelector(".employee-row");
    expect(row).toHaveClass("selected");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("calls onToggleEmployee when checkbox is clicked", () => {
    render(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleEmployee={mockOnToggleEmployee}
        selected={false}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggleEmployee).toHaveBeenCalledTimes(1);
    expect(mockOnToggleEmployee).toHaveBeenCalledWith("123");
  });

  test("calls onEdit when Edit button is clicked", () => {
    render(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleEmployee={mockOnToggleEmployee}
        selected={false}
      />
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployee);
  });

  test("calls onDelete when Delete button is clicked", () => {
    render(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleEmployee={mockOnToggleEmployee}
        selected={false}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("123");
  });

  test("renders nothing when employee prop is missing", () => {
    const { container } = render(<EmployeeRow />);
    expect(container.firstChild).toBeNull();
  });
});
