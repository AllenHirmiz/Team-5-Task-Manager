import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
  me {
    _id
    username
    email
    name
    job
    company
    address {
      street
      city
      state
      zipcode
    }
    savedTodos {
      _id
      username
      title
      description
      datecreated
      duedate
      status
    }
  }
}
`;
