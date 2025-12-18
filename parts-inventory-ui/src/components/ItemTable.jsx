import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemTable({ items, onEdit, onDelete, nightMode }) {
  return (
    <Table
      size="sm"
      sx={{
        width: '100%',
        bgcolor: nightMode ? '#4a4e69' : 'white',
        color: nightMode ? 'white' : 'black',
        border: '1px solid',
        borderColor: nightMode ? 'white' : 'gray',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      {/* Table Header */}
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Drawer</TableCell>
        <TableCell>Bin</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>

      {/* Table Rows */}
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.category}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{item.drawer}</TableCell>
          <TableCell>{item.bin}</TableCell>
          <TableCell>
            <IconButton size="sm" onClick={() => onEdit(item)}>
              <EditIcon sx={{ color: nightMode ? 'white' : 'black' }} />
            </IconButton>
            <IconButton size="sm" onClick={() => onDelete(item.id)}>
              <DeleteIcon sx={{ color: nightMode ? 'white' : 'black' }} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
