import { TableBody, TableCell, Table, TableHead, TableRow, TableContainer } from '@mui/material';
import React from 'react';

function TableComponent({ data }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Modulo</TableCell>
                        <TableCell align="right">Totale Soggiorno</TableCell>
                        <TableCell align="right">Preventivo Confermato</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">
                                {row.value.total.toLocaleString('de-DE', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }) + ' $'}
                            </TableCell>
                            <TableCell align="right">
                                {row.value.preventivo.toLocaleString('de-DE', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }) + ' $'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;
