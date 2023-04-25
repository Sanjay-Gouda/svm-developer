import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import React from 'react';

export const VehicleChargeTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Charge</TableCell>
            <TableCell>Amount</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Registration Charges</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tyres</TableCell>
            <TableCell>200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='text-md font-medium'>Total Charges</TableCell>
            <TableCell className='text-md font-medium'>1,40,000/-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
