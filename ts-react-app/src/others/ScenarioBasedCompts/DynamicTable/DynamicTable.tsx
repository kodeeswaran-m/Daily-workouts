import "./DynamicTable.css";

interface DynamicTableProps<T extends object> {
  data: T[];
  title?: string;
}

function renderValue(value: unknown) {
  if (typeof value === "object" && value != null) return JSON.stringify(value);
  return String(value);
}

const DynamicTable = <T extends object>({
  data,
  title,
}: DynamicTableProps<T>) => {
  if (!data || data.length === 0) {
    return <p>No Data Available</p>;
  }

  const columns = Object.keys(data[0]) as (keyof T)[];

  return (
    // <div className="table-container">
    //   {title && <p>{title}</p>}
    //   <table>
    //     <thead>
    //       <tr>
    //         {columns.map((columnName) => (
    //           <th key={String(columnName)}>{String(columnName)}</th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //         {data.map((row, rowIndex) => (
    //           <tr key={rowIndex}>
    //             {columns.map((columnName) => (
    //               <td key={String(columnName)}>
    //                 {renderValue(row[columnName])}
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="table-container">
      {title && <p>{title}</p>}
      <table>
        <thead>
          <tr>
            {columns.map((columnName) => (
              <th key={String(columnName)}>{String(columnName)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((columnName) => (
                <td key={String(columnName)}>{renderValue(row[columnName])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
