import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
const server = createHTTPServer({
    router: appRouter,
    createContext: () => ({}), // Empty context
    onError: ({ error }) => {
        console.error('tRPC error:', error);
    },
    middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
        }
        next();
    },
});
server.listen(3000);
console.log('Server running on http://localhost:3000');
