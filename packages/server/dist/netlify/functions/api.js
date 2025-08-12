// packages/server/netlify/functions/api.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../src/router';
export const handler = async (event) => {
    console.log('Function invoked:', event);
    const response = await fetchRequestHandler({
        endpoint: '/trpc',
        req: new Request(`https://${event.headers.host}${event.rawPath || '/trpc'}`, {
            method: event.requestContext.http.method,
            headers: event.headers,
            body: event.body ? Buffer.from(event.body, 'base64').toString() : undefined,
        }),
        router: appRouter,
        createContext: () => ({}),
    });
    return {
        statusCode: response.status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            ...Object.fromEntries(response.headers),
        },
        body: await response.text(),
    };
};
