const typeDefs = `
type Todo {
  _id: ID
  username: String
  title: String
  description: String
  datecreated: String
  duedate: String
  status: String
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    name: String
    savedTodos: [Todo]
  }

  input SavedTodoInput {
    TodoId: String!
    title: String!
    description: String!
    datecreated: String
    duedate: String
    status: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    todo: [Todo]
    comment: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, name: String): Auth
    login(email: String!, password: String!): Auth
    addTodo(username: String!,title:String!, description: String!, datecreated: String, duedate: String, status: String): Todo
    removeTodo(TodoId: ID!): User
    saveTodo(savedData: SavedTodoInput!): User
  }
`;

module.exports = typeDefs;
