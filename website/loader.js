module.exports = (source) => {
  const arr = source.split('---\n')
  arr[arr.length - 1] =  `
import Answer from '@site/src/components/Answer';
import Record from '@site/src/components/Record';

${arr[arr.length - 1]||''}
  `
  return arr.join('---\n')
}
