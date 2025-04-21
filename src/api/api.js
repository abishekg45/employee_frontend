// src/api/api.js

import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
