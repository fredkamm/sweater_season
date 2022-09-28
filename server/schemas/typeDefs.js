const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tag {
    _id: ID
    name: String
  }

  type Sweater {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    tags: [Tag]
  }

  type Order {
    _id: ID
    purchaseDate: String
    sweaters: [Sweater]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    tags: [Tag]
    sweaters(tag: ID, name: String): [Sweater]
    sweater(_id: ID!): Sweater
    user: User
    order(_id: ID!): Order
    checkout(sweaters: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(sweaters: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateSweater(_id: ID!, quantity: Int!): Sweater
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
