'use strict';

const Employee = require('../models/Employee');

// Service to get all employees with optional filters, pagination, and sorting
const getEmployees = async (page = 1, limit = 10, name, sortBy = 'name', sortOrder = 'asc') => {
  const skip = (page - 1) * limit;
  const query = name ? { name: { $regex: name, $options: 'i' } } : {};

  const sortOrderParsed = sortOrder === 'desc' ? -1 : 1;

  return await Employee.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrderParsed });
};

// Service to get a single employee by ID
const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};

// Service to create a new employee
const createEmployee = async (name, age, className, subjects, attendance) => {
  const newEmployee = new Employee({ name, age, class: className, subjects, attendance });
  return await newEmployee.save();
};

// Service to update an employee by ID
const updateEmployee = async (id, name, age, className, subjects, attendance) => {
    try {
        // Use Mongoose to update the employee in the database by ID
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id, // ID of the employee to update
            { 
                name, 
                age, 
                class: className, 
                subjects, 
                attendance 
            }, 
            { new: true } // Ensure that the updated employee is returned
        );
        
        return updatedEmployee;
    } catch (err) {
        throw new Error('Error updating employee: ' + err.message);
    }
};


module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
};
