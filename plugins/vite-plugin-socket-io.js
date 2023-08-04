// vite-plugin-socket-io.js
import { createServer } from 'http';
import { Server } from 'socket.io';
import { injectSocketIO } from '../utils/socketIoHandler';

export default function VitePluginSocketIO() {
  let io;
  
  return {
    name: 'vite-plugin-socket-io',
    
    // set up the Socket.IO server
    configureServer(server) {
      const httpServer = createServer(server.app);
      io = new Server(httpServer, { path: '/socket' });
      
      // now we can inject Socket.IO into our handler
      injectSocketIO(io);
      
      // make sure to listen on the right port
      httpServer.listen(3001); // replace with your desired port
    },

    // close the Socket.IO server when Vite is done
    close() {
      if (io) {
        io.close();
      }
    },
  };
}
