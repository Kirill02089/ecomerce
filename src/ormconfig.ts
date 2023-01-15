import { DataSource } from 'typeorm'
import { parsedEnv } from './constants'
import { Post } from './entities/Post'
import path from 'path'
import { User } from './entities/User'

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: parsedEnv.DB_USER,
  password: parsedEnv.DB_PASSWORD,
  database: parsedEnv.DB_NAME,
  entities: [Post, User],
  migrations: [path.join(__dirname, './migrations/*')]
})
