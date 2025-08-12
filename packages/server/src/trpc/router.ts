import { router, publicProcedure } from './trpc';

export const appRouter = router({
  greet: publicProcedure.query(() => {
    return "Hello from server!";
  }),
});

export type AppRouter = typeof appRouter;