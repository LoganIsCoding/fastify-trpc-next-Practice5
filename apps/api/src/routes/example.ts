import { router, publicProcedure } from "./trpc";
import { testSchema } from "schema";
import z from "zod";

const fakeDb = {
  getUser: async (id: number) => ({ id, name: `User ${id}`, posts: [1, 2, 3] }),
  getPost: async (id: number) => ({ id, title: `Post ${id}`, body: "Lorem ipsum" }),
};

export const exampleRouter = router({
  example: publicProcedure.input(testSchema).query(({ ctx, input }) => {
    ctx.req.log.info(input, "example");
    console.log("request body:", JSON.stringify(ctx.req.body));
    return input;
  }),
  getUserWithPosts: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const user = await fakeDb.getUser(input.userId);
      const posts = await Promise.all(
        user.posts.map((postId) => fakeDb.getPost(postId))
      );
      return { ...user, posts };
    }),
});
