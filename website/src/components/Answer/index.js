import React, { useCallback, useState } from 'react';
import Admonition from '@theme/Admonition';
import ShareButton from '../ShareButton'
import './index.css'

export default function Answer({ children }) {

  const [show, setShow] = useState(false)

  const toggleShow = useCallback(() => setShow(x => !x), [])

  return (
    <div>
      <Admonition type="tip" title={
        <div className='answer_header'>
          <span>解答</span>
          <ShareButton>分享该题</ShareButton>
          <div onClick={toggleShow} className={`answer_switch ${show ? 'answer_switch-active' : ''}`}></div>
        </div>
      }>
        <div className={`answer-content ${show ? 'answer-content-show' : ''}`}>
          {children}
          <div className='answer-content-fold'>
            <span className='answer-content-fold-link'>
              <a href='https://github.com/easy-interview/fe-interview' target="_blank">求 GitHub Star 💖</a>
            </span>
            <span onClick={toggleShow}>收起</span>
          </div>
          <div className='answer-content-mask' onClick={toggleShow}></div>
        </div>
      </Admonition>
    </div>
  );
}
