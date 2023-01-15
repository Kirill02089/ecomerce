import gql from "graphql-tag";

export default gql`
  type Post {
    id: Int!
    createdAt: String!
    updatedAt: String!
    title: String!
  }
  
  type Query {
    posts: [Post]
    post: Post
  }
`