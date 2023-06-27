import openai from '../utils/openAi.js';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

// openAi 의 createCompletion 함수로 입력값에 대한 결과값 문장 생성
async function createCompletion(prompt, temperature, maxTokens, topP, frequencyPenalty, presencePenalty) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt, // 입력 문장 또는 질문
      temperature: temperature, // 높을 수록 예측하지 못하는 답변
      max_tokens: maxTokens, // AI가 생성할 때 사용하는 최대 토큰 수
      top_p: topP, // 높을 수록 다양한 답변
      frequency_penalty: frequencyPenalty, // 높을 수록 AI가 이미 자주 등장한 단어를 피함
      presence_penalty: presencePenalty, // 높을 수록 AI가 새로운 단어나 문장을 생성하도록 유도
    });
    if (response) {
      return response;
    }
    throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 completion을 생성하지 못했습니다', 503);
  } catch (error) {
    next(error);
  }
}

// createCompletion 함수에 상담사 역할과 고정 첫 문장을 통해 챗 생성
// 그리고 프론트 측에서 AI 와 사용자간 챗을 계속 쌓아가며 맥락 유지하기
const chatService = {
  async createChat(message) {
    try {
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
      throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 챗을 생성하지 못했습니다', 503);
    } catch (error) {
      next(error);
    }
  },
  // createCompletion 함수에 상담사 역할과 마지막 요약문 생성 명령으로 마지막 챗 생성
  async createLastChat(message) {
    try {
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
      throw new AppError(CommonError.SERVER_ERROR, 'OpenAi 서버 오류로 인해 마지막 챗을 생성하지 못했습니다', 503);
    } catch (error) {
      next(error);
    }
  },
};

export default chatService;
