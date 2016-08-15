'use strict'
// use strict-mode to get func.call work with right this
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call


var _extend = require('objutil').extend
var ColorNames = require('less/lib/less/data/colors')
var Color = require('less/lib/less/tree/color')
var Dimension = require('less/lib/less/tree/dimension')
var Functions = require('less/lib/less/functions')()

function mixin() {
  var args = [].slice.call(arguments)
  args.forEach(function(v) {
    v.$vars = v.$vars || {}
  })
  return _extend.apply(null, args)
}

// invoke LESS Functions with param
function hasFunction(name) {
  return Functions.functionRegistry.get(name)
}

function getFuncion(name) {
  var args = [].slice.call(arguments, 1)
  return function(prev, node) {
    var ret = Functions.functionRegistry.get(name).apply(null, args.map(function(val) {
      return _getObj(val, node)
    }))
    return this ? ret.toCSS() : ret
  }
}

function _getObj(v, node) {
  if(v.type) return v
  if(typeof v=='function') return v.call(null, null, node)
  return typeof v=='string' && v.charAt(0)=='@' ? getObj(getVar(v)(null,node)) : getObj(v)
}

function _getVar(name, node) {
  var parent = node, val
  while (parent) {
    var $vars = parent.children.$vars
    if($vars && (val = $vars.prop[name.slice(1)])) return val[0]
    parent = parent.parent
  }
}

// getVar from node.$var value
function getVar(name, context) {
  context = context || {}
  return function (prev, node) {
    var val = context[name] || _getVar(name, node)
    return val
  }
}

// operation for css value, Dimension, Color
function Operation(op1, op, op2) {
  return function(prev, node) {
    var p = [op1, op2].map(function(v) {
      if(Array.isArray(v)) v = Operation.apply(null, v)(prev, node)
      return _getObj(v, node)
    })
    var val = p[0].operate({}, op, p[1])
    return this ? val.toCSS() : val
  }
}

// convert string into LESS Object
// current working type: Dimension, Color
var getObj = function(val) {
  // it's has to be string type to get LESS Object
  val += ''

  val = ColorNames[val] || val

  if(val.charAt(0)=='#') return new Color(val.slice(1))

  var match = val.match(/^rgba?\((.*)\)/)
  if(match) {
    var alpha=1, rgba = match[1].split(',')
    var rgb = rgba.length>3 ? (alpha=rgba.pop(), rgba) : rgba
    return new Color(rgb, alpha)
  }

  var match = val.match(/^([0-9.]+)([a-z%]*)/i)
  if(match) return new Dimension(match[1], match[2])

  return val
}

function lessValuePlugin(option) {
  return function(val,key,node,result) {
    return typeof val=='string' && val.charAt(0)=='@' ? getVar(val)(val,node) : val
  }
}

function getMixin (obj) {
  return function() {
    var keys = obj.$vars ? Object.keys(obj.$vars) : ''
    keys && [].slice.call(arguments).forEach(function(v, i) {
      obj.$vars[keys[i]] = v
    })
    return obj
  }
}

module.exports = {
  mixin : mixin,
  getVar : getVar,
  getObj : getObj,
  hasFunction : hasFunction,
  getFuncion : getFuncion,
  getMixin : getMixin,
  Operation : Operation,
  ColorNames : ColorNames,
  Color : Color,
  Dimension : Dimension,
  Functions : Functions,
  lessValuePlugin : lessValuePlugin,
}
