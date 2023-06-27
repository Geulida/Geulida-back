import imgService from '../services/imgService.js';

const imgController = {
  async createImg(req, res) {
    const { color, style, summary } = req.body;
    const prompt = `${style}, ${summary}, ${color} color`;
    const imageUrl = await imgService.generateImageUrl(prompt);

    if (imageUrl) {
      const imageData = await imgService.getImageData(imageUrl);
      const sanitizedSummary = imgService.sanitizeSummary(summary);
      const imageKey = `${sanitizedSummary}.jpg`;
      const s3ImageUrl = await imgService.uploadToS3(imageData, imageKey);

      res.json({
        url: s3ImageUrl,
      });
    } else {
      res.status(503).json({ message: '서버 오류로 인해 이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.' });
    }
  },
};

export default imgController;
