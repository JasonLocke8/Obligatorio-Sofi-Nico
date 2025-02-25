/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import ButtonCSS from './Button.module.css';

const Boton = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} >
      {text}
    </button>
  );
};

export default Boton;