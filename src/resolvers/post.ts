import { Post } from "../entities/Post";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class AddPostInput implements Partial<Post> {
  @Field()
  title: string;
}

@InputType()
class UpdatePostInput implements Partial<Post> {
  @Field()
  title: string;

  @Field()
  id: number;
}

@Resolver(Post)
export class PostResolver {
    @Query(() => [Post])
    async posts() {
        return Post.find()
    }

    @Mutation(() => Post)
    async addPost(
        @Arg('options') options: AddPostInput
    ) {
        const newPost = new Post()
        newPost.title = options.title

        return newPost.save()
    }

    @Mutation(() => Boolean)
    async updatePost(
        @Arg('options') options: UpdatePostInput
    ) {
        const post = await Post.findOne({ where: { id: options.id } })
        if (!post) return false
        post.title = options.title
        await post.save()
        return true
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number
    ) {
        const post = await Post.findOne({ where: { id } })
        if (!post) return false
        post.remove()
        return true
    }
}