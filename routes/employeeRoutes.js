const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

router.get('/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send({ error: 'Not found' });
  res.send(employee);
});

router.put('/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(employee);
});

router.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: 'Employee deleted' });
});

module.exports = router;

