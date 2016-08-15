// less obj wrapper

var extend = require('objutil').extend
var lessHelper = require('./less-helper.js')
var parser = require('./less-parser.js')
var cssobj = typeof cssobj=='undefined' ? require('cssobj') : cssobj

function lessObj(obj, option, data) {
  parser.transform(obj)

  option = option||{}

  option = extend(option, {
    plugins:{
      value: lessHelper.lessValuePlugin()
    }
  })

  return cssobj(obj, option, data)

}

module.exports = lessObj


