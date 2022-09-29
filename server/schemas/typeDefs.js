const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tag {
    _id: ID
    name: String
  }

  type Sweater {
    _id: ID
    name: String
    creator: String
    description: String
    image: String
    price: Float
    tags: [Tag]
    sold: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    sweaters: [Sweater]
  }

  type User {
    _id: ID
    username: String
    email: String
    wishList: [Sweater]
    seller: Boolean
    shop: [Sweater]
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
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(sweaters: [ID]!): Order
    addSweater(name: String!, creater: String!, description: String!, image: String!, price: Int!, tag: [ID]!): Sweater
    updateUser(username: String, email: String, password: String): User
    updateSweater(name: String!, description: String, price: Int, tag: [ID]): Sweater
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
