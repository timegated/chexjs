import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm';
import { ResponseContext } from '../context/Global';
import { Prism as HighLighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const Markdown = () => {
  const { state } = useContext(ResponseContext);
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match && match[1] ? match[1] : '';

      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }

      return (
        <HighLighter
          style={dark}
          language={lang}
          PreTag="div"
          {...props}
        >{String(children).replace(/\n$/, '')}</HighLighter>
      )
    }
  }
  return (
    <>
      {Object.entries(state.questions).map(([, answer], index) => {
        return (
          <div key={index}>
            <span style={{ color: 'var(--code-string-accent)' }}>{answer.question}</span>
            <ReactMarkdown remarkPlugins={[remarkGFM]} components={components}>{answer.answer}</ReactMarkdown>
          </div>)
      })}
    </>
  )
}

export default Markdown