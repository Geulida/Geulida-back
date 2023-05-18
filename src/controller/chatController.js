import openai from '../utils/openAi.js';

const chatController = {
  async createChat(req, res) {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'The following is a conversation with an AI therapist. The therapist has excellent empathy, is good at comforting people and understanding their emotions. AI: I am an AI therapist created by OpenAI. How was your day today?' +
        message,
      temperature: 0.9,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].text.trim(),
      });
    }
  },
  async createLastChat(req, res) {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'The following is a conversation with an AI therapist. The therapist has excellent empathy, is good at comforting people and understanding their emotions. AI: I am an AI therapist created by OpenAI. How was your day today?' +
        message +
        ' Human: Thanks. Could you summarize what we talked about today with really nice 15 words?',
      temperature: 0.9,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].text.trim(),
      });
    }
  },
};

export default chatController;
