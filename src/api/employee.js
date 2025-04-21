import axios from 'axios';
import { API_URL } from './api'; // adjust path as needed

const token = localStorage.getItem('token');
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchUsers = () => axios.get(`${API_URL}/users/list`, authHeader);
export const fetchAssignments = () => axios.get(`${API_URL}/assignments/all`, authHeader);
export const assignDepartment = (data) => axios.post(`${API_URL}/assignments/assign`, data, authHeader);
export const deleteAssignment = (assignmentId) => axios.delete(`${API_URL}/assignments/delete/${assignmentId}`, authHeader);
export const updateAssignment = (assignmentId, data) => axios.put(`${API_URL}/assignments/update/${assignmentId}`, data, authHeader);
