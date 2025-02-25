/* eslint-disable no-unused-vars */

import React from "react";

const TableRow = (row) => {
  return (
    <tr>
      {row.map((cell, index) => (
        <td key={index}> {cell} </td>
      ))}
    </tr>
  );
};

export default TableRow;
