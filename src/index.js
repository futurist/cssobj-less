var extend = require('objutil').extend
var normalize = require('./normalize.js')
var scaffolding = require('./scaffolding.js')
var alert = require('./alert.js')
var lessHelper = require('./less-helper.js')

var obj = extend(
  {},
  normalize,
  scaffolding,
  alert
)

var result = cssobj(obj, {
  onUpdate: cssobj_plugin_post_csstext(function(v) {
    console.log(v)
  }),
  plugins:{
    value: lessHelper.lessValuePlugin()
  }
})

console.log(result)


