import 'reflect-metadata'
import { connectionSource } from './ormconfig'
import Fastify, { FastifyInstance } from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import { buildSchema } from 'type-graphql'
import { PostResolver } from './resolvers/post'
import Redis from 'ioredis'
import { parsedEnv } from './constants'

const server: FastifyInstance = Fastify({})
const redis = new Redis(parsedEnv.REDIS_URL)

const start = async () => {
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false
    }),
    context: () => ({
      redis
    })
  })

  try {
    await connectionSource.initialize()
    await apollo.start()
    await server.register(apollo.createHandler())
    await server.listen({ port: 3000 })
    console.log('Start listening ', 3000)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start().catch((e) => {
  console.error(e)
})
