import 'reflect-metadata'
import { connectionSource } from './ormconfig'
import Fastify, { FastifyInstance } from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import { buildSchema } from 'type-graphql'
import { PostResolver } from './resolvers/post'

const server: FastifyInstance = Fastify({})

const start = async () => {
  try {
    await connectionSource.initialize()
  } catch (error) {
    console.error('Error during Data Source initialization', error)
    return
  }

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false
    })
  })

  try {
    await apollo.start()
    await server.register(apollo.createHandler())
    await server.listen({ port: 3000 })
    console.log('Start listening ', 3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start().catch((e) => {
  console.error(e)
})
