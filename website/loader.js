module.exports = (source) => {
  const arr = source.split('---\n')
  arr[arr.length - 1] =  `
import Answer from '@site/src/components/Answer';

${arr[arr.length - 1]||''}
  `
  return arr.join('---\n')
}
