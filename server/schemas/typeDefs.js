const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    name: String
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

  type Query {
    todo: Todo
  }

  type Query {
    comment: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, name: String,): Auth
    login(email: String!, password: String!): Auth
    addTodo(username: String,title:String, description: String): Todo
  }
`;

module.exports = typeDefs;
