import 'reflect-metadata'
import { connectionSource } from './ormconfig'
import Cors from '@fastify/cors'
import Fastify, { FastifyInstance } from 'fastify'
import Redis from 'ioredis'
import { parsedEnv } from './constants'
import fastifyJwt from '@fastify/jwt'
import { ApolloServerContext } from './types'
import { ApolloServer } from '@apollo/server'
import fastifyApollo, {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin
} from '@as-integrations/fastify'
import { resolvers } from './resolvers'
import typeDefs from './schemas'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './middlewares/shield'

const redis = new Redis(parsedEnv.REDIS_URL)
const server: FastifyInstance = Fastify({})
const graphqlSchema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions
)

const start = async () => {
  await connectionSource.initialize()
  const apollo = new ApolloServer<ApolloServerContext>({
    schema: graphqlSchema,
    plugins: [fastifyApolloDrainPlugin(server)]
  })

  const myContextFunction: ApolloFastifyContextFunction<
    ApolloServerContext
  > = async (request, reply) => ({
    req: request,
    fastify: server,
    reply,
    redis
  })

  await apollo.start()
  await server.register(fastifyApollo(apollo), {
    context: myContextFunction
  })

  await server.register(Cors, {
    origin: '*',
    // origin: [/\.studio.apollographql\.com$/, 'localhost:3000', 'http://localhost:3000/graphql', 'http://localhost:3000/', 'http://localhost:3000', 'studio.apollographql.com', 'https://studio.apollographql.com/sandbox/explorer', 'https://studio.apollographql.com/', 'https://studio.apollographql.com'],
    credentials: false
  })

  await server.register(fastifyJwt, {
    secret: parsedEnv.JWT_SECRET
  })

  server.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {}
  })

  await server.listen({ port: 3000 })
  console.log('Start listening ', 3000)
}

start().catch((e) => {
  console.error(e)
})
