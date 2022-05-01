import React, { useCallback, useState } from 'react';
import Admonition from '@theme/Admonition';
import './index.css'

export default function Answer({ children }) {

  const [show, setShow] = useState(false)

  const showAnswer = useCallback(() => setShow(true), [])

  return (
    <div>
      <Admonition type="tip" title="答案">
        <div className={`answer-content ${show ? 'answer-content-show' : ''}`}>
          {children}
          <div className='answer-content-mask' onClick={showAnswer}></div>
        </div>
      </Admonition>
    </div>
  );
}
