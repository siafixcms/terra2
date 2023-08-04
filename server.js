import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { injectSocketIO } from './utils/socketIoHandler.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { path: '/socket/' });

// Serve your built project
app.use(express.static('dist'));

// Inject Socket.IO
injectSocketIO(io);

// Start the server
const port = 3001;
httpServer.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
