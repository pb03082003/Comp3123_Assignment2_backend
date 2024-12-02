import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/employees', { name, department, position });
      alert('Employee added successfully!');
      setName('');
      setDepartment('');
      setPosition('');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
