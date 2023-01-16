import gql from 'graphql-tag'

export default gql`
  type Query {
    posts: [Post]
  }

  type Post {
    id: Int!
    createdAt: String!
    updatedAt: String!
    title: String!
  }
`
