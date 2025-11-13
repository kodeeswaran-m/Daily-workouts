import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown Component", () => {
  const mockSetFilterStatus = jest.fn();
  const mockSetFilterDepartment = jest.fn();

  const defaultProps = {
    activeDepartments: [
      { _id: "1", name: "Engineering" },
      { _id: "2", name: "HR" },
    ],
    filterStatus: "",
    setFilterStatus: mockSetFilterStatus,
    filterDepartment: "",
    setFilterDepartment: mockSetFilterDepartment,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Filter button", () => {
    render(<FilterDropdown {...defaultProps} />);
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  test("toggles dropdown menu on button click", () => {
    render(<FilterDropdown {...defaultProps} />);

    const button = screen.getByText(/filter/i);
    fireEvent.click(button);

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText("Status")).not.toBeInTheDocument();
  });

  test("opens status submenu and selects a status", () => {
    render(<FilterDropdown {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByText(/filter/i));

    // Click "Status" to open submenu
    fireEvent.click(screen.getByText("Status"));
    expect(screen.getByText("Active")).toBeInTheDocument();

    // Click "Active" filter
    fireEvent.click(screen.getByText("Active"));
    expect(mockSetFilterStatus).toHaveBeenCalledWith("active");
  });

  test("opens department submenu and selects a department", () => {
    render(<FilterDropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(/filter/i));

    // Open Department submenu
    fireEvent.click(screen.getByText("Department"));
    expect(screen.getByText("Engineering")).toBeInTheDocument();

    // Select a department
    fireEvent.click(screen.getByText("Engineering"));
    expect(mockSetFilterDepartment).toHaveBeenCalledWith("Engineering");
  });

  test("clicking 'All' in status resets status filter", () => {
    render(<FilterDropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(/filter/i));
    fireEvent.click(screen.getByText("Status"));
    fireEvent.click(screen.getByText("All"));

    expect(mockSetFilterStatus).toHaveBeenCalledWith("");
  });

  test("clicking outside closes dropdown", () => {
    render(<FilterDropdown {...defaultProps} />);
    const button = screen.getByText(/filter/i);

    // Open dropdown
    fireEvent.click(button);
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    // Dropdown should close
    expect(screen.queryByText("Status")).not.toBeInTheDocument();
  });

  test("shows active filter badge when filters applied", () => {
    const propsWithActiveFilters = {
      ...defaultProps,
      filterStatus: "active",
      filterDepartment: "HR",
    };

    render(<FilterDropdown {...propsWithActiveFilters} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
