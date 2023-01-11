import 'reflect-metadata'
import { Post } from "./entities/Post"
import { connectionSource } from './ormconfig'

async function main() {
    try {
        await connectionSource.initialize()
    } catch (error) {
        console.error("Error during Data Source initialization", error)
        return
    }

    console.log("Data Source has been initialized!")


    const post = new Post()
    post.title = ' sdfsdf s'

    await post.save()

    const posts = await Post.find()
    console.log(posts);
    
}

main().catch(e => {
    console.error(e);
}) 