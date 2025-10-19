import { Server } from 'socket.io';
import commentController from '../controllers/client/comment.controller.js';

let io;

export const socketIOPackageConfig = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on('sendComment', async (data) => {
      await commentController.createProductComment(data);
    });
  });

  return io;
};

export const IO = () => {
  if (!io) throw new Error('SocketIO not initialized!');
  return io;
};
