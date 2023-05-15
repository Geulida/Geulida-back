import OpenAI from 'openai';

const { Configuration, OpenAIApi } = OpenAI;
const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
