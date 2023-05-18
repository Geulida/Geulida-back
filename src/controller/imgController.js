import openai from '../utils/openAi.js';

const imgController = {
  async createImg(req, res) {
    const { color, style, summary } = req.body;
    const prompt = `${color}, ${style}, ${summary}`;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '256x256',
    });
    console.log(response.data);
    if (response.data) {
      res.json({
        url: response.data.data[0].url,
      });
    }
  },
};

export default imgController;
