/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

const CampoInput = ({ type, placeholder, value, onChange, name }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required
      />
    </div>
  );
};

export default CampoInput;
