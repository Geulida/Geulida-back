import imgService from '../services/imgService.js';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

// imgService 에서 만든 함수들로 이미지 생성하고, 생성한 데이터를 AWS s3에 저장 후, s3 저장소의 이미지 url을 응답
const imgController = {
  async createImg(req, res) {
    try {
      const { color, style, summary } = req.body;
      const prompt = `${style}, ${summary}, ${color} color`;
      const imageUrl = await imgService.generateImageUrl(prompt);

      if (imageUrl) {
        const imageData = await imgService.getImageData(imageUrl);
        const sanitizedSummary = imgService.sanitizeSummary(summary);
        const imageKey = `${sanitizedSummary}.jpg`;
        const s3ImageUrl = await imgService.uploadToS3(imageData, imageKey);

        res.status(200).json({
          url: s3ImageUrl,
        });
      } else {
        throw new AppError(CommonError.SERVER_ERROR, 'AWS 서버 오류로 인해 이미지를 저장하지 못했습니다', 503);
      }
    } catch (error) {
      next(error);
    }
  },
};

export default imgController;
