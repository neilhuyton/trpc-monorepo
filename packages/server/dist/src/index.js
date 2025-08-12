// packages/server/src/index.ts
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './trpc/router';
const PORT = 3000;
createHTTPServer({
    middleware: cors({ origin: 'http://localhost:5173' }),
    router: appRouter,
}).listen(PORT);
console.log(`Server listening on port ${PORT}`);
