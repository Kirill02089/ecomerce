import type * as Fastify from 'fastify'
import { Redis } from 'ioredis'

export type ApolloServerContext = {
  req: Fastify.FastifyRequest
  reply: Fastify.FastifyReply
  redis: Redis
}
