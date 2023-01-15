import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`