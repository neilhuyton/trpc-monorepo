export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    greet: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
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
    getMeasurements: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            startDate?: string | undefined;
            endDate?: string | undefined;
        } | undefined;
        output: {
            value: number;
            id: number;
            createdAt: Date;
        }[];
        meta: object;
    }>;
    deleteMeasurement: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            success: boolean;
        };
        meta: object;
    }>;
}>>;
export type AppRouter = typeof appRouter;
