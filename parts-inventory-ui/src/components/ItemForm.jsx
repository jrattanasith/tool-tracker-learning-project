import { useState, useEffect } from 'react';
import { Button, Input, Stack } from '@mui/joy';

export default function ItemForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    drawer: '',
    bin: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        name: '',
        category: '',
        quantity: '',
        drawer: '',
        bin: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert('Name is required');
    onSubmit({
      ...form,
      quantity: parseInt(form.quantity) || 0,
    });
    setForm({
      name: '',
      category: '',
      quantity: '',
      drawer: '',
      bin: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <Input
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <Input
          placeholder="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />
        <Input
          placeholder="Drawer"
          name="drawer"
          value={form.drawer}
          onChange={handleChange}
        />
        <Input
          placeholder="Bin"
          name="bin"
          value={form.bin}
          onChange={handleChange}
        />
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Add Item'}
        </Button>
      </Stack>
    </form>
  );
}
