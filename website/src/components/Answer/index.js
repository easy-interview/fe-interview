import React, { useCallback, useState } from 'react';
import Admonition from '@theme/Admonition';
import './index.css'

export default function Answer({ children }) {

  const [show, setShow] = useState(false)

  const toggleShow = useCallback(() => setShow(!show), [show])

  return (
    <div>
      <Admonition type="tip" title={
        <div className='answer_header' onClick={toggleShow}>
          <span>答案</span>
          <div className={`answer_switch ${show ? 'answer_switch-active' : ''}`}></div>
        </div>
      }>
        <div className={`answer-content ${show ? 'answer-content-show' : ''}`}>
          {children}
          <div className='answer-content-fold'>
            <span onClick={toggleShow}>收起</span>
          </div>
          <div className='answer-content-mask' onClick={toggleShow}></div>
        </div>
      </Admonition>
    </div>
  );
}
