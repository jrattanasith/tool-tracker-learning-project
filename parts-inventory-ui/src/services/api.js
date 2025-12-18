const API_URL = 'http://localhost:3001/api/items';

// GET all items
export const getItems = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

// POST: add new item
export const addItem = async (item) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
};

// PUT: update existing item
export const updateItem = async (item) => {
  const res = await fetch(`${API_URL}/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
};

// DELETE: remove item
export const deleteItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
};
