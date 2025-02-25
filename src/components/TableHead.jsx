/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}> {header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
