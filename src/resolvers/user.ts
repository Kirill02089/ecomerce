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

//   @Mutation(() => String, { nullable: true })
//   async login(
//     @Arg('options') options: AddUserInput,
//     @Ctx() { server }: ApolloServerContext
//   ) {
//     let user: User | null = null

//     try {
//       user = await User.findOneOrFail({ where: { username: options.username } })

//     } catch (error) {
//       console.log('error', error);
//     }

//     if (!user) return null

//     const isVerified = await argon2.verify(user.password, options.password)

//     if (!isVerified) return null

//     const token = server.jwt.sign({ ...options, id: user.id })

//     return token
//   }
// }
