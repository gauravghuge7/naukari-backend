// server.js
import http from 'http';
import { Server } from 'socket.io'; // Import Socket.io
import cors from 'cors';
import app from "../app.js";

// Create an HTTP server
const server = http.createServer(app);

// CORS options
const corsOptions = {
   origin: '*', // Allow all origins for demonstration; adjust as needed for security
   methods:"*", // Allow these methods
   allowedHeaders: "*", // Specify any custom headers
   credentials: true // Allow credentials (if needed)
};

// Create a Socket.io server with CORS settings
const io = new Server(server, {
   cors: corsOptions,
});

// Listen for incoming connections
io.on('connection', (socket) => {
   console.log('A user connected:', socket.id);

   // Listen for chat messages
   socket.on('chat message', (msg) => {
      console.log('Message received: ' + msg);
      // Broadcast the message to all connected clients
      io.emit('chat message', msg);
   });

   
   // Handle disconnection
   socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
   });
});

// Preflight CORS handling for Express
app.options('*', cors(corsOptions)); // Enable pre-flight across the board

export default server;
