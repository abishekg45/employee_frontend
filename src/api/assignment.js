import API from './api';

const token = localStorage.getItem('token');

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

export const assignDepartment = (user_id, department_id) =>
  API.post('assignments/assign', { user_id, department_id }, authHeader);

export const updateAssignedDepartment = (id, user_id, department_id) =>
  API.put(`assignments/update/${id}`, { user_id, department_id }, authHeader);

export const deleteAssignment = (id) =>
  API.delete(`assignments/delete/${id}`, authHeader);

export const fetchAssignments = () =>
  API.get('assignments/list', authHeader); // assuming you have this endpoint
