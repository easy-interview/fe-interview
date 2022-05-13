import React from 'react';
import Card from '../Card'

export default function Record({ children }) {
  return <Card type="info" title="记录" share="分享该记录" >{children}</Card>;
}
