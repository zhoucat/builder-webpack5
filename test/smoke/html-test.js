const glob = require('glob-all')

describe('check html files', () => {
  it('should html file', (done) => {
    const files = glob.sync([
      './dist/admin.html',
      './dist/staff.html'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no html file in')
    }
  })
})
