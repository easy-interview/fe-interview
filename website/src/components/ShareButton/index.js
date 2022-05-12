import React, { useCallback, useRef, useState } from 'react';
import './index.css'

function select(element) {
  var selectedText;

  if (element.nodeName === 'SELECT') {
      element.focus();

      selectedText = element.value;
  }
  else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
      var isReadOnly = element.hasAttribute('readonly');

      if (!isReadOnly) {
          element.setAttribute('readonly', '');
      }

      element.select();
      element.setSelectionRange(0, element.value.length);

      if (!isReadOnly) {
          element.removeAttribute('readonly');
      }

      selectedText = element.value;
  }
  else {
      if (element.hasAttribute('contenteditable')) {
          element.focus();
      }

      var selection = window.getSelection();
      var range = document.createRange();

      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);

      selectedText = selection.toString();
  }

  return selectedText;
}


export default function ShareButton({ children }) {
  const [status, setStatus] = useState(0)
  const ref = useRef(null)
  const timer = useRef(null)
  const onClick = useCallback(() => {
    if (timer.current != null) return
    try {
      const id = ref.current.closest('.admonition').parentNode.previousElementSibling.id
      const url = `${location.origin}${location.pathname}#${encodeURIComponent(id)}`
      const fakeElement = document.createElement('textarea'); // Prevent zooming on iOS
      fakeElement.style.fontSize = '12pt'; // Reset box model
      fakeElement.style.border = '0';
      fakeElement.style.padding = '0';
      fakeElement.style.margin = '0'; // Move element out of screen horizontally
      fakeElement.style.position = 'absolute';
      fakeElement.style.left = '-9999px'; // Move element to the same position vertically
      fakeElement.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px'
      fakeElement.setAttribute('readonly', '');
      fakeElement.value = url;
      document.body.appendChild(fakeElement);
      select(fakeElement);
      document.execCommand('copy')
      fakeElement.remove();
      setStatus(1)
    } catch (e) {
      setStatus(2)
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      timer.current = null
      setStatus(0)
    }, 2000)
  }, [])

  return (
    <div className={`share_btn ${!status ? '' : status === 1 ? 'share_btn-success' : 'share_btn-error'}`} ref={ref} onClick={onClick}>
      {!status ? children : status === 1 ? '复制成功，请粘贴分享' : '复制失败，请在地址栏复制链接'}
    </div>
  );
}
