'use strict';


const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  # Employee Type
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  # Query to fetch employee data
  type Query {
    getEmployees(page: Int, limit: Int, name: String, sortBy: String, sortOrder: String): [Employee]
    getEmployee(id: ID!): Employee
  }

  # Mutations for adding and updating employees
  type Mutation {
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: Int!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Int): Employee
  }
`;

module.exports = employeeSchema;