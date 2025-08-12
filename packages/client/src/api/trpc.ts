// packages/client/src/api/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@my-workspace/server/src/router";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/.netlify/functions/api/trpc", // Match endpoint in api.ts
    }),
  ],
});
