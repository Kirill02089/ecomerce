import { Resolvers } from '../resolvers-types'
import { postQueryResolver } from './post'
import { userMutationResolver, userQueryResolvers } from './user'

export const resolvers: Resolvers = {
  Query: {
    ...postQueryResolver,
    ...userQueryResolvers
  },
  Mutation: {
    ...userMutationResolver
  }
}
