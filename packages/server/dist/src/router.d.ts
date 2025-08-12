export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    getMeasurements: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            value: number;
            id: number;
            createdAt: Date;
        }[];
        meta: object;
    }>;
    addMeasurement: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            value: number;
        };
        output: {
            value: number;
            id: number;
            createdAt: Date;
        };
        meta: object;
    }>;
}>>;
export type AppRouter = typeof appRouter;
