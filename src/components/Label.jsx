/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';

const Label = ({ text, htmlFor }) => {
    return (
        <label htmlFor={htmlFor}>
            {text}
        </label>
    );
};

export default Label;