import React, { useCallback, useState } from 'react';
import Admonition from '@theme/Admonition';
import './index.css'

export default function Answer({ children }) {

  const [show, setShow] = useState(false)

  const toggleShow = useCallback(() => setShow(!show), [show])

  return (
    <div>
      <Admonition type="tip" title={
        <div className='answer_header'>
          <span>答案</span>
          <div onClick={toggleShow} className={`answer_switch ${show ? 'answer_switch-active' : ''}`}></div>
        </div>
      }>
        <div className={`answer-content ${show ? 'answer-content-show' : ''}`}>
          {children}
          <div className='answer-content-mask' onClick={toggleShow}></div>
        </div>
      </Admonition>
    </div>
  );
}
