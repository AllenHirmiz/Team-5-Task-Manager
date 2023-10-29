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
  job: String
  company: String
  address: Address
  savedTodos: [Todo]
}

type Address {
  street: String
  city: String
  state: String
  zipcode: Int
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
  removeTodo(todoId: ID!): Todo
  saveTodo(savedData: SavedTodoInput!): User
  editTodo(
    _id: ID!,
    username: String!,
    title: String!,
    description: String!,
    datecreated: String!,
    duedate: String!,
    status: String!
  ): Todo
}
`;

module.exports = typeDefs;
