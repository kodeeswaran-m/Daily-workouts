import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("EmployeeTable Component", () => {
  const employees = [
    {
      _id: "1",
      employeeId: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      department: { name: "HR" },
      jobTitle: "Manager",
      status: "Active",
    },
    {
      _id: "2",
      employeeId: "EMP002",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "9876543210",
      department: { name: "IT" },
      jobTitle: "Developer",
      status: "Inactive",
    },
  ];

  let selectedIds = [];
  const onToggleEmployee = jest.fn((id) => {
    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter((i) => i !== id);
    } else {
      selectedIds.push(id);
    }
  });

  const onToggleAll = jest.fn((checked) => {
    selectedIds = checked ? employees.map((e) => e._id) : [];
  });

  const onDelete = jest.fn();
  const onSortStatus = jest.fn();

  const renderTable = () =>
    render(
      <MemoryRouter>
        <EmployeeTable
          employees={employees}
          selectedIds={selectedIds}
          onToggleEmployee={onToggleEmployee}
          onToggleAll={onToggleAll}
          onDelete={onDelete}
          onSortStatus={onSortStatus}
          sortOrder="asc"
        />
      </MemoryRouter>
    );

  test("renders 'No Data Found' when employees array is empty", () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          employees={[]}
          selectedIds={[]}
          onToggleEmployee={() => {}}
          onToggleAll={() => {}}
          onDelete={() => {}}
          onSortStatus={() => {}}
          sortOrder="asc"
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  test("renders employees in the table", () => {
    renderTable();

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/EMP001/i)).toBeInTheDocument();
    expect(screen.getByText(/EMP002/i)).toBeInTheDocument();
  });

  test("selects and deselects individual employee checkbox", () => {
    renderTable();

    const johnCheckbox = screen.getAllByRole("checkbox")[1]; 
    fireEvent.click(johnCheckbox);

    expect(onToggleEmployee).toHaveBeenCalledWith("1");
  });


 test("selects and deselects all employees", () => {
  renderTable();

  const selectAllCheckbox = screen.getAllByRole("checkbox")[0];

  fireEvent.click(selectAllCheckbox);
  expect(onToggleAll).toHaveBeenCalledWith(true, employees);

  fireEvent.click(selectAllCheckbox);
  expect(onToggleAll).toHaveBeenCalledTimes(2);
});


  test("calls delete button handler", () => {
    renderTable();

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete employee/i,
    }); 
    const deleteButton = deleteButtons.find((btn) => btn.querySelector("svg"));
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalled();
  });

  test("navigates on edit button click", () => {
    renderTable();

    const editButtons = screen.getAllByRole("button", {
      name: /edit employee/i,
    });
    const editButton = editButtons.find((btn) => btn.querySelector("svg"));
    fireEvent.click(editButton);

    expect(mockedNavigate).toHaveBeenCalled();
  });

  test("navigates on employee name click", () => {
    renderTable();

    const johnName = screen.getByText(/john doe/i);
    fireEvent.click(johnName);

    expect(mockedNavigate).toHaveBeenCalledWith("/employeeDetail/1");
  });

  test("calls sort button handler", () => {
    renderTable();

    const sortBtn = screen.getByTitle(/sort by status/i);
    fireEvent.click(sortBtn);

    expect(onSortStatus).toHaveBeenCalled();
  });
});
