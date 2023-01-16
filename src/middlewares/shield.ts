import { allow, rule, shield } from 'graphql-shield'
import { ApolloServerContext } from '../types'
import { QueryResolvers } from 'src/resolvers-types'
import { ShieldRule, IRuleFieldMap, IRules } from 'graphql-shield/typings/types'

export const isAuthenticated = rule()(
  async (parent, args, ctx: ApolloServerContext) => {
    return Boolean(ctx.req.user)
  }
)

type RuleTree = {
  Query: {
    [Property in keyof QueryResolvers]: ShieldRule | IRuleFieldMap
  }
} & IRules

export const permissions = shield(
  {
    Query: {
      '*': allow,
      me: isAuthenticated
    },
    Mutation: {
      '*': allow
    }
  } as RuleTree,
  {
    allowExternalErrors: true
  }
)
