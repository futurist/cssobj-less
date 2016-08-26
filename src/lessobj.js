// less obj wrapper

var parser = require('./less-parser.js')
var cssobj = typeof cssobj=='undefined' ? require('../../cssobj/dist/cssobj.cjs.js') : cssobj


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

function extendPlugin() {
  return {
    value: function (val, key, node, result) {
      node.extendedNodes = node.extendedNodes || []
      if(val && key=='$extend') extendSel(result, node, val)
      return val
    }
  }
}

function lessObj(obj, option, data) {

  option = option||{}
  var plugins = option.plugins = option.plugins||[]

  plugins.unshift(extendPlugin())

  return cssobj(parser.transform(obj), option, data)
}


lessObj.ColorNames = require('less/lib/less/data/colors')
lessObj.Color = require('less/lib/less/tree/color')
lessObj.Dimension = require('less/lib/less/tree/dimension')
lessObj.Quoted = require('less/lib/less/tree/quoted')
lessObj.Functions = require('less/lib/less/functions')().functionRegistry


module.exports = lessObj


