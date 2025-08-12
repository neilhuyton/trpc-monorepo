import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './trpc/router';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = 3000;

const server = createHTTPServer({
  middleware: cors({ origin: 'http://localhost:5173' }),
  router: appRouter,
});

server.listen(PORT);

console.log(`Server listening on port ${PORT}`);

// Handle process termination
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

export type { AppRouter } from './trpc/router';