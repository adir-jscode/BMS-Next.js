import React from "react";

interface TableProps {
  columns: string[];
  data: { [key: string]: string | number | boolean | React.JSX.Element | null }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="table w-full text-sm">
        {/* Table Header */}
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-gray-800 text-white">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-700">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-2">
                    {typeof row[col] === "object" ? row[col] : row[col] || "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center text-gray-400 p-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
