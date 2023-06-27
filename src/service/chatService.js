import openai from '../utils/openAi.js';

async function createCompletion(prompt, temperature, maxTokens, topP, frequencyPenalty, presencePenalty) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt, // 입력 문장 또는 질문
    temperature: temperature, // 높을 수록 예측하지 못하는 답변
    max_tokens: maxTokens, // AI가 생성할 때 사용하는 최대 토큰 수
    top_p: topP, // 높을 수록 다양한 답변
    frequency_penalty: frequencyPenalty, // 높을 수록 AI가 이미 자주 등장한 단어를 피함
    presence_penalty: presencePenalty, // 높을 수록 AI가 새로운 단어나 문장을 생성하도록 유도
  });

  return response;
}

const chatService = {
  async createChat(message) {
    const response = await createCompletion(
      'The following is a conversation with an AI therapist. The therapist has excellent empathy, is good at comforting people and understanding their emotions. AI: I am an AI therapist created by OpenAI. How was your day today?' +
        message,
      0.9,
      200,
      1,
      0,
      0.6
    );

    if (response.data.choices) {
      return response.data.choices[0].text.trim();
    }
  },

  async createLastChat(message) {
    const response = await createCompletion(
      'The following is a conversation with an AI therapist. The therapist has excellent empathy, is good at comforting people and understanding their emotions. AI: I am an AI therapist created by OpenAI. How was your day today?' +
        message +
        ' Human: Thanks. Could you summarize what we talked about today with really nice 15 words?',
      0.9,
      200,
      1,
      0,
      0.6
    );

    if (response.data.choices) {
      return response.data.choices[0].text.trim();
    }
  },
};

export default chatService;
