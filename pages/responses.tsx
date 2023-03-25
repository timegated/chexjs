import React, { useState, useContext, useEffect } from 'react'
import Markdown from './components/Markdown';
import { ResponseContext } from './context/Global';

const Responses = () => {
  const { state, dispatch } = useContext(ResponseContext);
  const [finished, setIsFinished] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");

  const response = async () => {
    let isCancelled: boolean = false;
    const response = await fetch(`https://chatnode-api.com/stream/chat?prompt=${question}&modelChoice=${state.modelChoice}`);
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      try {
        while (!isCancelled) {
          const { done, value } = await reader.read();

          if (done || isCancelled) {
            return;
          };

          const decodedVal = decoder.decode(value);

          dispatch({ type: 'updateLatestQuestionAnswer', payload: { question, answer: decodedVal } })
        }
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        reader.releaseLock();
        setIsFinished(true);
      }
    };
  }

  useEffect(() => {
    if (finished) {
      dispatch({ type: 'addNewQuestionAnswer', payload: { question: '', answer: '' } });
    }
    return () => setIsFinished(false);
  }, [finished]);

  console.log(finished);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={() => void response()}>Generate Response</button>
        <Markdown />
      </div>
    </>
  )
}

export default Responses;