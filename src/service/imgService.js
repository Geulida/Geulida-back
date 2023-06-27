import openai from '../utils/openAi.js';
import AWS from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const imgService = {
  async generateImageUrl(prompt) {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });

    if (response.data) {
      return response.data.data[0].url;
    } else {
      return null;
    }
  },

  async getImageData(imageUrl) {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer', // 이미지 같은 이진 데이터는 이렇게 arraybuffer 라는 고정 크기 이진 데이터 타입으로 바꿔서 다루는 게 효율적
    });

    return response.data;
  },

  async uploadToS3(imageData, imageKey) {
    const params = {
      Bucket: 'ziuss-bucket',
      Key: imageKey,
      Body: imageData,
      ContentType: 'image/jpeg',
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  },

  sanitizeSummary(summary) {
    // 일반 동기 함수
    const randomSuffix = Math.floor(Math.random() * 10000); // 4자리의 랜덤 수
    const sanitizedSummary = summary.replace(/[^a-zA-Z0-9-_]/g, '');
    return sanitizedSummary + randomSuffix;
  },
};

export default imgService;
