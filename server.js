import { createServer as createViteServer } from 'vite';
import { createServer as createSvelteKitServer } from '@sveltejs/kit/adapter-node';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { injectSocketIO } from './utils/socketIoHandler.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { path: '/socket/' });

// Create the Vite and SvelteKit servers
const vite = await createViteServer({ server: { middlewareMode: 'ssr' } });
const svelteKit = await createSvelteKitServer(vite);

// Use the SvelteKit server middleware
app.use(svelteKit.middleware());

// Inject Socket.IO
injectSocketIO(io);

// Start the server
const port = 3001;
httpServer.listen(port, () => {
  console.log(`Running socket on port ${port}`);
});
