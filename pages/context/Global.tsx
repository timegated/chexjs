// GlobalState.tsx
import { createContext, Dispatch, useReducer } from 'react';

interface ResponseState {
  modelChoice: string;
  text: string;
  questions: Questions[];
}

type ResponseStateAction =
  | { type: 'changeModelChoice'; payload: string }
  | { type: 'updateLatestQuestionAnswer'; payload: Questions }
  | { type: 'addNewQuestionAnswer'; payload: Questions }

interface ResponseStateContextValue {
  state: ResponseState;
  dispatch: Dispatch<ResponseStateAction>;
}


interface Questions {
  question: string;
  answer: string;
}

interface ContextProps {
  children: React.ReactNode
}

const initialState: ResponseState = {
  modelChoice: 'gpt-3.5-turbo',
  text: '',
  questions: [
    {
      question: '',
      answer: ''
    }
  ],
};

const reducer = (state: ResponseState, action: ResponseStateAction): ResponseState => {
  switch (action.type) {
    case 'changeModelChoice':
      return { ...state, modelChoice: action.payload };
    case 'updateLatestQuestionAnswer':
      const lastQuestionIndex = state.questions.length - 1;
      const updatedQuestions = [...state.questions];
      updatedQuestions[lastQuestionIndex] = {
        ...updatedQuestions[lastQuestionIndex],
        question: action.payload.question,
        answer: updatedQuestions[lastQuestionIndex].answer + action.payload.answer,
      };
      return { ...state, questions: updatedQuestions };
    case 'addNewQuestionAnswer':
      return { ...state, questions: [...state.questions, action.payload] }
    default:
      throw new Error('Unknown action type');
  }
};

export const ResponseContext = createContext<ResponseStateContextValue>({
  state: initialState,
  dispatch: () => null,
});

export const ResponseProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ResponseContext.Provider value={{ state, dispatch }}>
      {children}
    </ResponseContext.Provider>
  );
};
