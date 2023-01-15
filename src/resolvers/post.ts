// import { ApolloServerContext } from '../types'
// import { Post } from '../entities/Post'
// import {
//   Arg,
//   Ctx,
//   Field,
//   InputType,
//   Mutation,
//   Query,
//   Resolver
// } from 'type-graphql'


// @InputType()
// class AddPostInput implements Partial<Post> {
//   @Field()
//   title: string
// }

// @InputType()
// class UpdatePostInput implements Partial<Post> {
//   @Field()
//   title: string

//   @Field()
//   id: number
// }

// @Resolver(Post)
// export class PostResolver {
//   @Query(() => [Post])
//   async posts(@Ctx() { redis }: ApolloServerContext) {
//     const key = 'posts'
//     let posts = null

//     try {
//       posts = JSON.parse((await redis.get(key)) || '') as Post[]
//     } catch (error) {}

//     if (!posts) {
//       posts = await Post.find()
//       await redis.set(key, JSON.stringify(posts))
//     }

//     return posts
//   }

//   @Mutation(() => Post)
//   async addPost(@Arg('options') options: AddPostInput) {
//     const newPost = new Post()
//     newPost.title = options.title

//     return newPost.save()
//   }

//   @Mutation(() => Boolean)
//   async updatePost(@Arg('options') options: UpdatePostInput) {
//     const post = await Post.findOne({ where: { id: options.id } })
//     if (!post) return false
//     post.title = options.title
//     await post.save()
//     return true
//   }

//   @Mutation(() => Boolean)
//   async deletePost(@Arg('id') id: number) {
//     const post = await Post.findOne({ where: { id } })
//     if (!post) return false
//     post.remove()
//     return true
//   }
// }
import { Post } from "../entities/Post";
import { QueryResolvers } from "../resolvers-types";

export const postResolver: Partial<QueryResolvers> = {
    posts: async () => {
        return await Post.find()
    }
}