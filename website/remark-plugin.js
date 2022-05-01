const visit = require('unist-util-visit')

module.exports = function () {
  return (root) => {
    let i = 0
    visit(root, 'heading', (child, _, parent) => {
      if (parent !== root || child.depth !== 2 || !child.children.length) {
        return;
      }
      child.children[0].value = `${++i}. ` + child.children[0].value
    })
  }
}
