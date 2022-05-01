module.exports = async function() {
  return {
    name: 'custom-plugin',
    configureWebpack(config) {
      config.module.rules.forEach(r => {
        if (r && r.test && r.test.test('.md')) {
          r.use.push({
            loader: require.resolve('./loader.js')
          })
        }
      })
      return {}
    }
  }
}
