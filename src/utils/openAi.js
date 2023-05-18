import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
