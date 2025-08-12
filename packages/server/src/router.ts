// packages/server/src/router.ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  getMeasurements: t.procedure.query(async () => {
    return prisma.measurement.findMany();
  }),
  addMeasurement: t.procedure
    .input(z.object({ value: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.measurement.create({ data: { value: input.value } });
    }),
});

export type AppRouter = typeof appRouter;
