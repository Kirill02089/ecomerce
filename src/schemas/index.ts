import userSchema from './user'
import postSchema from './post'

export async function getSchemas() {
  return [userSchema, postSchema]
}
