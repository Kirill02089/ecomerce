// import {
//   Arg,
//   Ctx,
//   Field,
//   InputType,
//   Mutation,
//   Query,
//   Resolver
// } from 'type-graphql'
// import { User } from '../entities/User'
// import argon2 from "argon2";
// import { ApolloServerContext } from '../types';

// @InputType()
// class AddUserInput implements Partial<User> {
//   @Field()
//   username!: string

//   @Field()
//   password!: string
// }

// @Resolver(User)
// export class UserResolver {
//   @Query(() => [User])
//   async users() {
//     return User.find()
//   }

//   @Query(() => User, { nullable: true })
//   async me(
//     @Ctx() { request }: ApolloServerContext
//   ) {
//     const userId = (request.user as { id: number }).id

//     if (!userId) return null
//     const user = await User.findOne({ where: { id: userId } })

//     return user
//   }

//   @Mutation(() => String)
//   async register(
//     @Arg('options') options: AddUserInput,
//     @Ctx() { server }: ApolloServerContext,
//   ) {
//     const newUser = new User()
//     newUser.username = options.username
//     newUser.password = await argon2.hash(options.password)
//     await newUser.save()

//     return server.jwt.sign({ ...options, id: newUser.id })
//   }

// import { GraphQLError } from "graphql";
// import { assertDirective } from "graphql";
import { GraphQLError } from 'graphql'
import { User } from '../entities/User'
import { MutationResolvers, QueryResolvers } from '../resolvers-types'
import argon2 from 'argon2'

export const userMutationResolver: Partial<MutationResolvers> = {
  login: async (_, { input }, { fastify }) => {
    let user: User | null = null

    try {
      user = await User.findOneOrFail({ where: { username: input.username } })
    } catch (error) {
      throw new GraphQLError('User not found')
    }

    const isVerified = await argon2.verify(user.password, input.password)

    if (!isVerified) {
      throw new GraphQLError('Incorrect password')
    }

    const token = fastify.jwt.sign({
      ...input,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as Partial<User>)

    return token
  }
}

export const userQueryResolvers: Partial<QueryResolvers> = {
  me: async (_, __, { req }) => {
    return req.user as User
  }
}
