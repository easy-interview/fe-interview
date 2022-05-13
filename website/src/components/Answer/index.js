import React from 'react';
import Card from '../Card'

export default function Answer({ children }) {
  return <Card type="tip" title="解答" share="分享该题" >{children}</Card>;
}
