import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Stack, Button, TextField } from '@mui/material';
import ItemTable from '../components/ItemTable';
import { getItems, addItem, updateItem, deleteItem } from '../services/api';

export default function Dashboard({ nightMode }) {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    drawer: '',
    bin: '',
  });

  // Load items from backend
  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert('Name is required');

    if (editingItem) {
      const updated = await updateItem({ ...form, id: editingItem.id });
      setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
      setEditingItem(null);
    } else {
      const newItem = await addItem(form);
      setItems(prev => [...prev, newItem]);
    }

    setForm({ name: '', category: '', quantity: '', drawer: '', bin: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm(item);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        level="h2"
        sx={{ mb: 2, color: nightMode ? 'white' : 'black' }}
      >
        Parts Inventory Dashboard
      </Typography>

      {/* Form */}
      <Card
        sx={{
          mb: 3,
          p: 2,
          bgcolor: nightMode ? '#4a4e69' : 'white',
          color: nightMode ? 'white' : 'black',
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              size="small"
              sx={{
                bgcolor: nightMode ? '#6c6f85' : 'white',
                color: nightMode ? 'white' : 'black',
              }}
            />
            <TextField
              placeholder="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              size="small"
              sx={{
                bgcolor: nightMode ? '#6c6f85' : 'white',
                color: nightMode ? 'white' : 'black',
              }}
            />
            <TextField
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              size="small"
              sx={{
                bgcolor: nightMode ? '#6c6f85' : 'white',
                color: nightMode ? 'white' : 'black',
              }}
            />
            <TextField
              placeholder="Drawer"
              name="drawer"
              value={form.drawer}
              onChange={handleChange}
              size="small"
              sx={{
                bgcolor: nightMode ? '#6c6f85' : 'white',
                color: nightMode ? 'white' : 'black',
              }}
            />
            <TextField
              placeholder="Bin"
              name="bin"
              value={form.bin}
              onChange={handleChange}
              size="small"
              sx={{
                bgcolor: nightMode ? '#6c6f85' : 'white',
                color: nightMode ? 'white' : 'black',
              }}
            />
            <Button type="submit" variant="contained" size="medium">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </Stack>
        </form>
      </Card>

      {/* Table */}
      <ItemTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        nightMode={nightMode}
      />
    </Box>
  );
}
