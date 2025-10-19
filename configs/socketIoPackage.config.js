import { Server } from 'socket.io';
import commentController from '../controllers/client/productComment.controller.js';

let io;

export const socketIOPackageConfig = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Handle product comment
    socket.on('sendComment', async (data) => {
      await commentController.createProductComment(data);
    });
    socket.on('removeComment', async (data) => {
      await commentController.removeProductComment(data);
    });
  });

  return io;
};

export const IO = () => {
  if (!io) throw new Error('SocketIO not initialized!');
  return io;
};
