import { router, publicProcedure } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const appRouter = router({
  greet: publicProcedure.query(() => {
    return "Hello from server!";
  }),
  addMeasurement: publicProcedure
    .input(z.object({ value: z.number().positive() }))
    .mutation(async ({ input }) => {
      const measurement = await prisma.measurement.create({
        data: {
          value: input.value,
        },
      });
      return measurement;
    }),
  getMeasurements: publicProcedure
    .input(
      z
        .object({
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return prisma.measurement.findMany({
        where: {
          createdAt: {
            gte: input?.startDate ? new Date(input.startDate) : undefined,
            lte: input?.endDate ? new Date(input.endDate) : undefined,
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),
  deleteMeasurement: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await prisma.measurement.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
