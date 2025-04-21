import React, { useEffect, useState } from 'react';
import {
  assignDepartment,
  updateAssignedDepartment,
  deleteAssignment,
  fetchAssignments,
} from './api/assignment';

const departments = [
  { id: 1, name: 'HR' },
  { id: 2, name: 'Tech' },
  { id: 3, name: 'Marketing' },
];

const EmployeeAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ user_id: '', department_id: '' });
  const [editingId, setEditingId] = useState(null);

  const loadAssignments = async () => {
    try {
      const res = await fetchAssignments();
      setAssignments(res.data.data || []);
    } catch (err) {
      console.error('Fetch failed:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAssignedDepartment(editingId, form.user_id, form.department_id);
      } else {
        await assignDepartment(form.user_id, form.department_id);
      }
      setForm({ user_id: '', department_id: '' });
      setEditingId(null);
      loadAssignments();
    } catch (err) {
      console.error('Submit failed:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      loadAssignments();
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

  const handleEdit = (assignment) => {
    setForm({ user_id: assignment.user_id, department_id: assignment.department_id });
    setEditingId(assignment.id);
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Assign Employee to Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          required
        />
        <select
          value={form.department_id}
          onChange={(e) => setForm({ ...form, department_id: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>
        <button type="submit">{editingId ? 'Update' : 'Assign'}</button>
      </form>

      <h3 style={{ marginTop: 40 }}>Assigned Employees</h3>
      <ul>
        {assignments.map((a) => (
          <li key={a.id}>
            User {a.user_id} → Dept {a.department_id}
            <button onClick={() => handleEdit(a)} style={{ marginLeft: 10 }}>Edit</button>
            <button onClick={() => handleDelete(a.id)} style={{ marginLeft: 5 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeAssignment;
