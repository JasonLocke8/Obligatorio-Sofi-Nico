/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Select = ({ options, id, name, value, onChange, atributo }) => {
    return (
        <select id={id} name={name} value={value} onChange={onChange}>
            <option value="">Seleccione una opción</option>
            {options.map((option) => (
                <option key={option.id} value={option[atributo]}>
                    {option[atributo]}
                </option>
            ))}
        </select>
    );
};

export default Select;