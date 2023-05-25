import openai from '../utils/openAi.js';
import AWS from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const imgController = {
  async createImg(req, res) {
    const { color, style, summary } = req.body;
    const prompt = `${style}, ${summary}, ${color} color`;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    if (response.data) {
      const imageUrl = response.data.data[0].url;
      const imageData = await getImageData(imageUrl);
      const sanitizedSummary = sanitizeSummary(summary);
      const imageKey = `${sanitizedSummary}.jpg`;
      const s3ImageUrl = await uploadToS3(imageData, imageKey);

      res.json({
        url: s3ImageUrl,
      });
    } else {
      res.status(500).json({ error: 'Failed to create image' });
    }
  },
};

async function getImageData(imageUrl) {
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer', //이미지 같은 이진 데이터는 이렇게 바꿔서 다루는 게 효율적
  });

  return response.data;
}

async function uploadToS3(imageData, imageKey) {
  const params = {
    Bucket: 'ziuss-bucket',
    Key: imageKey,
    Body: imageData,
    ContentType: 'image/jpeg',
  };

  const result = await s3.upload(params).promise();
  return result.Location; // 이미지 url
}

function sanitizeSummary(summary) {
  const randomSuffix = Math.floor(Math.random() * 10000); // 4자리의 랜덤 수
  const sanitizedSummary = summary.replace(/[^a-zA-Z0-9-_]/g, '');
  return sanitizedSummary + randomSuffix;
}

export default imgController;
