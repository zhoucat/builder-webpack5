const glob = require('glob-all')

describe('check js css files', () => {
  it('should js css file', (done) => {
    const files = glob.sync([
      './dist/admin_*.js',
      './dist/admin_*.css',
      './dist/staff*.js',
      './dist/staff*.css'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no js css file in')
    }
  })
})
