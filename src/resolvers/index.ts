import { Resolvers } from '../resolvers-types'
import { postResolver } from './post'

export const resolvers: Resolvers = {
  Query: {
    ...postResolver
  }
}
