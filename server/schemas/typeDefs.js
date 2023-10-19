const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  type Todo {
    _id: ID
    todoId: String!
    title: String!
    description: String!
    createdDate: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstname: String!, lastname: String!,): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
