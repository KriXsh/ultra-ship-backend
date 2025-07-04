'use strict';


const jwt = require('jsonwebtoken');
const Employee = require('../../models/Employee');


function checkAdmin(req) {
  if (!req.user || req.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

const employeeResolvers = {
  Query: {
    getEmployees: async (_, { page = 1, limit = 10, name, sortBy = 'name', sortOrder = 'asc' }, { req }) => {
      if (req.user.role === 'employee') {
        return Employee.find({ _id: req.user.id }).limit(limit);
      }

      const skip = (page - 1) * limit;
      const query = name ? { name: { $regex: name, $options: 'i' } } : {};
      const sortOrderParsed = sortOrder === 'desc' ? -1 : 1;

      return Employee.find(query).skip(skip).limit(limit).sort({ [sortBy]: sortOrderParsed });
    },
    getEmployee: async (_, { id }, { req }) => {
      if (req.user.role === 'employee' && req.user.id !== id) {
        throw new Error('Unauthorized');
      }
      return Employee.findById(id);
    },
  },

  Mutation: {
    addEmployee: async (_, { name, age, class: empClass, subjects, attendance }, { req }) => {
      checkAdmin(req);

      const newEmployee = new Employee({ name, age, class: empClass, subjects, attendance });
      return newEmployee.save();
    },
    updateEmployee: async (_, { id, name, age, class: empClass, subjects, attendance }, { req }) => {
      checkAdmin(req);

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { name, age, class: empClass, subjects, attendance },
        { new: true }
      );
      return updatedEmployee;
    },
  },
};

module.exports = employeeResolvers;
