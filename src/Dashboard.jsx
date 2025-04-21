import React, { useEffect, useState } from 'react';
import {
  fetchUsers,
  fetchAssignments,
  assignDepartment,
  deleteAssignment,
  updateAssignment,
} from './api/employee';

const departments = [
  { id: 1, name: 'HR' },
  { id: 2, name: 'Engineering' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Sales' },
];

const EmployeeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadAssignments = async () => {
    try {
      const response = await fetchAssignments();
      setAssignments(response.data.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedDepartment) return;
    try {
      await assignDepartment({ user_id: selectedUser, department_id: selectedDepartment });
      loadAssignments();
    } catch (error) {
      console.error('Error assigning department:', error);
    }
  };

  const handleDelete = async (assignmentId) => {
    try {
      await deleteAssignment(assignmentId);
      loadAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleEdit = async (assignmentId, newDeptId) => {
    try {
      await updateAssignment(assignmentId, {
        user_id: assignments.find((a) => a.assignment_id === assignmentId).employee_id,
        department_id: newDeptId,
      });
      loadAssignments();
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadAssignments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <table className="table-auto w-full border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Assign Employee to Department</h2>
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAssign}
        >
          Assign
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Assigned Employees</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.assignment_id} className="border">
              <td className="p-2">{assignment.employee_id}</td>
              <td className="p-2">{assignment.employee_name}</td>
              <td className="p-2">{assignment.email}</td>
              <td className="p-2">
                <select
                  value={assignment.department_id}
                  onChange={(e) => handleEdit(assignment.assignment_id, e.target.value)}
                  className="border p-1"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(assignment.assignment_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
