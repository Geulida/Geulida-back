import chatService from '../services/chatService.js';

const chatController = {
  async createChat(req, res) {
    const { message } = req.body;
    const response = await chatService.createChat(message);

    if (response) {
      res.json({ message: response });
    }
  },

  async createLastChat(req, res) {
    const { message } = req.body;
    const response = await chatService.createLastChat(message);

    if (response) {
      res.json({ message: response });
    }
  },
};

export default chatController;
