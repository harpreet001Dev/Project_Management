import React from 'react';

const Table = ({ headers, data, renderCell, rowKey }) => {
 
  
  return (
    <table className="table-auto w-full ">
      <thead className="text-white text-left bg-[#1B1B1B]">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="font-semibold"
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody >
        {data.map((row, rowIndex) => (
          <tr
            key={row[rowKey] || rowIndex}
            className="border-b border-gray-600"
          >
            {headers.map((header, colIndex) => (
              <td
                key={colIndex}
                className="text-white py-2 "
              >
                {renderCell ? renderCell(row, header.key) : row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
