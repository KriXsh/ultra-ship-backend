const { gql } = require('apollo-server-express');
const employeeSchema = require('./schemas/employeeSchema');

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  
  ${employeeSchema}
`;

module.exports = { typeDefs };
