// context/GlobalState.js
import React, { createContext, useReducer } from 'react';

const initialState: any = {
  modelChoice: 'gpt-3.5-turbo',
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'changeModelChoice':
      return { ...state, modelChoice: action.payload };
    default:
      throw new Error('Unknown action type');
  }
};

export const GlobalStateContext = createContext(initialState);

export const GlobalStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
