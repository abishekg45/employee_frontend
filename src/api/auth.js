// src/api/auth.js
import API from './api';

export const signupUser = async (userData) => {
  return await API.post('auth/signup', userData);
};

export const loginUser = async (loginData) => {
  return await API.post('auth/login', loginData);
};

export const fetchUserList = async () => {
  const token = localStorage.getItem('token');
  return await API.get('users/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
