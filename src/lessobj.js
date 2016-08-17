// less obj wrapper

var extend = require('objutil').extend
var parser = require('./less-parser.js')
var cssobj = typeof cssobj=='undefined' ? require('cssobj') : cssobj


// support for $extend key as value plugin
function extendSel(result, sourceNode, target) {
  var isRegExp = {}.toString.call(target)=='[object RegExp]'
  result.nodes.forEach(function(node) {
    if(sourceNode.extendedNodes.indexOf(node)>-1) return
    var selTextPart = node.selTextPart
    if(!selTextPart || sourceNode.parentRule !== node.parentRule) return
    sourceNode.selTextPart.forEach(function(source) {
      var extArr = selTextPart.filter(function(v) {
        return isRegExp
          ? v.match(target)
          : v==target
      }).map(function(v) {
        return isRegExp ? v.replace(target, source) : source
      })
      if(extArr.length) {
        ![].push.apply(selTextPart, extArr)
        sourceNode.extendedNodes.push(node)
      }
    })
  })
}

function extendPlugin(val, key, node, result) {
  node.extendedNodes = node.extendedNodes || []
  if(val && key=='$extend') extendSel(result, node, val)
  return val
}

function lessObj(obj, option, data) {
  parser.transform(obj)

  option = option||{}
  var plugins = option.plugins = option.plugins||{}

  plugins.value = [extendPlugin].concat(plugins.value||[])

  return cssobj(obj, option, data)
}

module.exports = lessObj


