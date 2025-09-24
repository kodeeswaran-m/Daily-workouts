import React from "react";
import { SquarePen, Trash, ArrowUpDown, ArrowDownUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeTable.css";

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  selectedIds,
  onToggleEmployee,
  onToggleAll,
  onSortStatus,   // ✅ new prop
  sortOrder,      // ✅ new prop
}) => {
  const allSelected =
    employees.length > 0 &&
    employees.every((emp) => selectedIds.includes(emp._id));

  const navigate = useNavigate();

  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onToggleAll(e.target.checked, employees)}
              />
            </th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>
              Status{" "}
              <button
                className="sort-btn"
                onClick={onSortStatus}
                title="Sort by status"
              >
                {sortOrder === "asc"?<ArrowUpDown size={16} />:<ArrowDownUp size={16} />}
              </button>

            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9" className="nodata">
                No Data Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(emp._id)}
                    onChange={() => onToggleEmployee(emp._id)}
                  />
                </td>
                <td title={emp.employeeId}>{emp.employeeId}</td>
                <td
                  title={emp.name}
                  onClick={() => navigate(`/employeeDetail/${emp._id}`)}
                  className="emp-name-link"
                >
                  {emp.firstName} {emp.lastName}
                </td>
                <td title={emp.email}>{emp.email}</td>
                <td title={emp.phone}>{emp.phone}</td>
                <td>{emp?.department?.name}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.status}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="icon-btn edit-btn"
                      // onClick={() => onEdit(emp)}
                      onClick={()=>navigate(`/updateEmployee/${emp._id}`)}
                    >
                      <SquarePen size={16} />
                    </button>
                    <button
                      className="icon-btn del-btn"
                      onClick={() => onDelete(emp._id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;





// import React from "react";
// import { SquarePen, Trash } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "../styles/EmployeeTable.css";
// const EmployeeTable = ({
//   employees,
//   onEdit,
//   onDelete,
//   selectedIds,
//   onToggleEmployee,
//   onToggleAll,
// }) => {
//   const allSelected =
//     employees.length > 0 &&
//     employees.every((emp) => selectedIds.includes(emp._id));
//   const navigate = useNavigate();
//   return (
//     <div className="employee-table-wrapper">
//       <table className="employee-table">
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={allSelected}
//                 onChange={(e) => onToggleAll(e.target.checked, employees)}
//               />
//             </th>
//             {/* <th>S.No</th> */}
//             <th>Employee ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Department</th>
//             <th>Job Title</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="nodata">
//                 No Data Found
//               </td>
//             </tr>
//           ) : (
//             employees.map((emp) => (
//               <tr key={emp._id} >
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(emp._id)}
//                     onChange={() => onToggleEmployee(emp._id)}
//                   />
//                 </td>
//                 {/* <td>{i + 1}</td> */}
//                 <td title={emp.employeeId}>{emp.employeeId}</td>
//                 <td title={emp.name} onClick={() => navigate(`/employeeDetail/${emp._id}`)}>
//                   {emp.firstName} {emp.lastName}
//                 </td>
//                 <td title={emp.email}>{emp.email}</td>
//                 <td title={emp.phone}>{emp.phone}</td>
//                 <td>{emp?.department?.name}</td>
//                 <td>{emp.jobTitle}</td>
//                 <td>{emp.status}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button className="icon-btn edit-btn" onClick={() => onEdit(emp)}>
//                       <SquarePen size={16} />
//                     </button>
//                     <button
//                       className="icon-btn del-btn"
//                       onClick={() => onDelete(emp._id)}
//                     >
//                       <Trash size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default EmployeeTable;
