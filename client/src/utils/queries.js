import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      todoCount
      savedTodos {
        _id
        todoId
        description
        title
      }
    }
  }
`;
