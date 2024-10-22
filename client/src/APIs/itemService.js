import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const getItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createItem = async (item) => {
  const res = await axios.post(API_URL, item);
  return res.data;
};

export const updateItem = async (id, item) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
