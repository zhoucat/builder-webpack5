'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './assets/css/admin.less'
import bg from './assets/images/test.jpg'
import hello from '../common/hellow'
class App extends React.Component {
  constructor () {
    super(...arguments)

    this.state = {
      Text: null
    }
  }

  loadComponent () {
    import('./text').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render () {
    hello()
    const { Text } = this.state
    return <div className="admin">
      <p className="head">的娃的点点滴滴ddddddsdddd娃</p>
      <p onClick={ this.loadComponent.bind(this) }>动态引入</p>
      {
        Text ? <Text /> : null
      }
      <img src={bg} />
    </div>
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('root')
)
