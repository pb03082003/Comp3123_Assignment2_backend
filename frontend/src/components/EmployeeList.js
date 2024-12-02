import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);
  

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      {/* Add Employee Button */}
      <Link to="/add-employee">
  <button>Add Employee</button>
</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => alert(`Edit Employee: ${employee.name}`)}>Edit</button>
                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                <button onClick={() => alert(`View Details: ${employee.name}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeList;
