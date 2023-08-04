// socketIoHandler.js
export function injectSocketIO(io) {
    io.on('connection', (socket) => {
      console.log('A user connected');
      
      socket.on('message', (data) => {
        console.log('Message received:', data);
        
        // You can add logic here to handle incoming messages,
        // possibly by dispatching actions or updating state
      });
      
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
      
      // You can add more event listeners here to handle other Socket.IO events
    });
  }
  