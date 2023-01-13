import dotenv from 'dotenv'

const { parsed: parsedEnv = {} } = dotenv.config()

export { parsedEnv }
