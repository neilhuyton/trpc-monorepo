import { router, publicProcedure } from './trpc';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export const appRouter = router({
  greet: publicProcedure.query(() => {
    return "Hello from server!";
  }),
  addWeight: publicProcedure
    .input(z.object({ value: z.number().positive() }))
    .mutation(async ({ input }) => {
      const weight = await prisma.weight.create({
        data: {
          value: input.value,
        },
      });
      return weight;
    }),
  getWeights: publicProcedure
    .input(
      z
        .object({
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      return prisma.weight.findMany({
        where: {
          createdAt: {
            gte: input?.startDate ? new Date(input.startDate) : undefined,
            lte: input?.endDate ? new Date(input.endDate) : undefined,
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }),
  deleteWeight: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await prisma.weight.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;