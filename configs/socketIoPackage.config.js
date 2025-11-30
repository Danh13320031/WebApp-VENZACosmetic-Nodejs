import { Server } from 'socket.io';
import commentController from '../controllers/client/productComment.controller.js';
import handleMessageHelper from '../helpers/client/chatbot/cloud/handleMessage.helper.js';
import chatbotHistoryModel from '../models/chatbotHistory.model.js';

let io;

export const socketIOPackageConfig = (server) => {
  io = new Server(server);

  io.on('connection', async (socket) => {
    // Handle product comment
    socket.on('CLIENT_SEND_COMMENT', async (data) => {
      await commentController.createProductComment(data);
    });
    socket.on('CLIENT_REMOVE_COMMENT', async (data) => {
      await commentController.removeProductComment(data);
    });

    // Handle chatbot
    socket.on('CLIENT_JOIN_CHAT', async (sessionId) => {
      if (!sessionId) return;

      const history = await chatbotHistoryModel.aggregate([
        {
          $match: {
            session_id: sessionId,
            deleted: false,
            status: 'active',
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 50,
        },
        {
          $sort: { createdAt: 1 },
        },
      ]);

      socket.emit('SERVER_SEND_CHATBOT_HISTORY', history);
    });

    socket.on('CLIENT_SEND_CHATBOT_MESSAGE', async (data) => {
      const { content, sessionId } = data;

      if (!content) return;

      const chatbotHistoryTotal = await chatbotHistoryModel.countDocuments({});

      await chatbotHistoryModel.create({
        session_id: sessionId,
        type: 'text',
        role: 'user',
        position: chatbotHistoryTotal + 1,
        content: content,
      });

      socket.emit('SERVER_SEND_CHATBOT_TYPING', { show: true });

      const botRes = await handleMessageHelper(content);

      console.log('Dữ liệu bot trả về::: ', botRes);

      socket.emit('SERVER_SEND_CHATBOT_TYPING', { show: false });

      await chatbotHistoryModel.create({
        session_id: sessionId,
        role: 'bot',
        type: botRes.type,
        content: botRes.text,
        position: chatbotHistoryTotal + 2,
        data: botRes.data,
        botType: 'cloud',
      });

      socket.emit('SERVER_RETURN_CHATBOT_MESSAGE', botRes);
    });
  });

  return io;
};

export const IO = () => {
  if (!io) throw new Error('SocketIO not initialized!');
  return io;
};
