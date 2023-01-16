import gql from 'graphql-tag'

export default gql`
  type Mutation {
    login(input: LoginInput!): String
  }

  type Query {
    me: User
  }

  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }
`
