import openai from '../utils/openAi.js';
import AWS from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

dotenv.config();

// aws 액세스 키, 시크릿 키
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

// 이미지 생성 후 url 응답
const imgService = {
  async generateImageUrl(prompt) {
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '512x512',
      });

      if (response.data) {
        return response.data.data[0].url;
      } else {
        throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 이미지를 생성하지 못했습니다', 503);
      }
    } catch (error) {
      next(error);
    }
  },

  // 이미지 url에서 이미지 데이터 가져오기
  async getImageData(imageUrl) {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer', // 이미지 같은 이진 데이터는 이렇게 arraybuffer 라는 고정 크기 이진 데이터 타입으로 바꿔서 다루는 게 효율적
    });
    return response.data;
  },

  // 가져온 이미지 데이터를 AWS S3 클라우드에 저장
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
  // 파일명이 겹치지 않게 랜덤수와 요약문으로 파일명 생성
  sanitizeSummary(summary) {
    // 일반 동기 함수
    const randomSuffix = Math.floor(Math.random() * 10000); // 4자리의 랜덤 수
    const sanitizedSummary = summary.replace(/[^a-zA-Z0-9-_]/g, '');
    return sanitizedSummary + randomSuffix;
  },
};

export default imgService;
