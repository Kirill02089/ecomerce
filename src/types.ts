import Redis from 'ioredis'

export type ApolloServerContext = {
  redis: Redis
}
