import { Post } from "../entities/Post";
import { MyContext } from "../types.js";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext) {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number, @Ctx() { em }: MyContext) {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string, @Ctx() { em }: MyContext) {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ) {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Query(() => Post, { nullable: true })
  async deletePost(@Arg("id", () => Int) id: number, @Ctx() { em }: MyContext) {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
