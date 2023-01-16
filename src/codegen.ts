import type { CodegenConfig } from '@graphql-codegen/cli'
import { join } from 'node:path'

const config: CodegenConfig = {
  schema: join(__dirname, './schemas/*.ts'),
  watch: true,
  watchConfig: {
    usePolling: true,
    interval: 1000
  },
  generates: {
    [join(__dirname, './resolvers-types.ts')]: {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './types#ApolloServerContext',
        useIndexSignature: true,
        mapperTypeSuffix: 'Model',
        mappers: {
          User: './entities/User#User',
          Post: './entities/Post#Post'
        }
      }
    }
  }
}

export default config
