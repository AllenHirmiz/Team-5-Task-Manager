import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_TODO = gql`
  mutation saveTodo($savedData: SavedTodoInput!) {
    saveTodo(savedData: $savedData) {
      _id
      todoCount
      email
      password
      username
      savedTodos {
        title
        description
        todoId
        _id
      }
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation Mutation($todoId: ID!) {
    removeTodo(todoId: $todoId) {
      _id
      username
      savedTodos {
        title
        description
        todoId
      }
      email
      todoCount
    }
  }
`;
