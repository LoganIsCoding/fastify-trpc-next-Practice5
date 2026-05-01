import { publicProcedure, router } from "./trpc";

const mockDatabase = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Record ${i + 1}`,
  value: Math.random(),
}));

export const healthRouter = router({
  health: publicProcedure.query(({ ctx }) => {
    return {
      health: "ok",
    };
  }),
  records: publicProcedure.query(() => {
    return mockDatabase.filter((r) => r.value > 0);
  }),
});
