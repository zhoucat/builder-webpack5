
const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.admin.indexOf('test/smoke/template/src/admin/index.js') > 0, true)
    assert.equal(baseConfig.entry.staff.indexOf('test/smoke/template/src/staff/index.js') > 0, true)
  })
})
