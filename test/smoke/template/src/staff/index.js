'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import hello from '../common/hellow'
import { a } from './tree_shaking'
class App extends React.Component {
  render () {
    console.log(a())
    console.log(hello())
    return <div className="admin">
      <p className="head">我是员工</p>
    </div>
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('root')
)
