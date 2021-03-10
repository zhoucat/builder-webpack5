const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

process.chdir(path.join(__dirname, 'template'))
const mocha = new Mocha({
  timeout: 10000
})

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod')

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))
    console.log('webpack build success, beginng test')
    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-test.js'))

    mocha.run()
  })
})
