import chatService from '../services/chatService.js';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

const chatController = {
  async createChat(req, res, next) {
    try {
      const { message } = req.body;
      const response = await chatService.createChat(message);

      if (!response) {
        throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 챗을 생성하지 못했습니다', 503);
      }
      res.status(200).json({ message: response });
    } catch (error) {
      next(error);
    }
  },

  async createLastChat(req, res, next) {
    try {
      const { message } = req.body;
      const response = await chatService.createLastChat(message);

      if (!response) {
        throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 마지막 챗을 생성하지 못했습니다', 503);
      }
      res.status(200).json({ message: response });
    } catch (error) {
      next(error);
    }
  },
};

export default chatController;
