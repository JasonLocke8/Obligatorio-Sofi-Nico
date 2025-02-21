import TableHead from './TableHead';
import TableRow from "./TableRow";
import React from 'react';



const Table = ({headers, bodyData}) => {

    return (
        <table>
            <TableHead headers={headers}/>
            <tbody>
                <tr>
                    {bodyData.map((row, index) =>
                        <TableRow key={index} row = {row}/>
                    )}
                </tr>
            </tbody>
        </table>
    )
};

export default Table;