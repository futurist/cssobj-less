
import {extend} from 'objutil'
import * as normalize from './normalize.js'
import * as scaffolding from './scaffolding.js'
import * as alert from './alert.js'
import {lessValuePlugin} from './less-helper.js'

var obj = extend(
  {},
  scaffolding,
  alert
)

// bs extend will overwrite normalize, so seperate it
cssobj(normalize)

// var result = cssobj(obj, {
//   onUpdate: cssobj_plugin_post_csstext(function(v) {
//     console.log(v)
//   }),
//   plugins:{
//     value: lessValuePlugin()
//   }
// })

// console.log(result)


import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      obj: obj,
      result: cssobj(obj, {local: props.local, onUpdate:cssobj_plugin_post_csstext(function(v) {
        console.log(v)
      }), plugins:{
        value: lessValuePlugin()
      } })
    }
    this.updateCSS = this.updateCSS.bind(this)
  }

  updateCSS () {
    this.state.obj['.nav'].fontSize = '34px'
    this.state.result.update()
  }

  render () {
    var result = this.state.result
    return (
      <div className="alert-wrapper">
        <div className={result.mapClass("alert alert-danger")} role="alert"><strong>Well done!</strong> You successfully read this important alert message. </div>
        <div className={result.mapClass("alert alert-danger")} role="alert"> <strong>Heads up!</strong> This alert needs your attention, but it's not super important. </div>
      <div className={result.mapClass("alert alert-danger")} role="alert"> <strong>Warning!</strong> Better check yourself, you're not looking too good. </div>
        <div className={result.mapClass("alert alert-danger")} role="alert"> <strong>Oh snap!</strong> Change a few things up and try submitting again. </div>
      </div>
    )
  }
}

ReactDOM.render(<App local={true} />, document.getElementById('container'))

