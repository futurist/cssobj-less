
var lessHelper = require('./less-helper.js')

function walkObj(obj, option) {
  option = option||{}

  $mixins = option.mixins = option.mixins||obj.$mixins
  if(obj.$mixin)
    for(var k in obj.$mixin){
      lessHelper.mixin(obj, $mixins[k].apply(null, obj.$mixin[k]))
    }

  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue
    var v = obj[k]
    // if(k=='$mixin' && $mixins[v[0]]) lessHelper.mixin(obj, $mixins[v[0]].apply(null, v.slice(1)))
    if(typeof v=='string') obj[k] = parseExpression(v)
    if(v && typeof v=='object') walkObj(v, option)
  }
  return obj
}


function parseExpression(str) {
  // var str = 'ceil((@font-size-base * -1.7))'
  // str = '(ceil((8.2 - 3)) + (3 + 2))'

  var arr = []
  parseStr(str, arr)
  console.log(arr[0])
  // console.log( 3333, arr[0], applyArr(arr[0]) )
  return applyArr(arr[0])
}

function applyArr(arr) {
  return Array.isArray(arr)
    ? arr[0].apply(null, arr.slice(1).map(function(v) {
      return Array.isArray(v) ? applyArr(v) : v
    }))
  : arr
}

function parseStr(val, callArr) {
  var ret

  val += ''

  val = lessHelper.ColorNames[val] || val

  // color rgba(), #333, @var-name
  var match = val.match(/^\s*(rgba?\([^)]*\))(.*)$/i)  //rgba
      || val.match(/^\s*(#[0-9A-F]+)(.*)$/i)  //#333
      || val.match(/^\s*(@[a-z0-9$-]+)(.*)\s*$/i) //@var-name
      || val.match(/^\s*([0-9.-]+[a-z%]*)(.*)\s*$/i)  //-10px
      || val.match(/^\s*([\+\-\*\/])(.*)\s*$/)  // +-*/
  if(match) {
    callArr.push(match[1])
    return parseStr(match[2], callArr)
  }

  // ceil()
  var match = val.match(/^\s*([a-z]+)\((.*)\s*$/i)
  if (match && lessHelper.hasFunction(match[1]) ) {
    var arr = [lessHelper.getFuncion, match[1]]
    var rest = parseStr(match[2], arr)
    // callArr.push(arr[0].apply(null, arr.slice(1)))
    callArr.push(arr)
    return parseStr(rest, callArr)
  }

  // operate()
  var match = val.match(/^\s*\((.*)\s*$/i)
  if(match) {
    var arr = [lessHelper.Operation]
    var rest = parseStr(match[1], arr)
    // callArr.push(arr[0].apply(null, arr.slice(1)))
    callArr.push(arr)
    return parseStr(rest, callArr)
  }

  // )
  var match = val.match(/^\s*\)(.*)\s*$/)
  if(match) {
    // return rest string
    return match[1]
  }

  // ,
  var match = val.match(/^\s*,(.*)\s*$/)
  if (match) {
    // , will ignore and go on
    return parseStr(match[1], callArr)
  }

  // end
  if(/^\s*$/.test(val)) {
    return callArr
  }

  // don't kown others, just return
  callArr.push(val)
  return callArr
}

function transform(obj) {
  var mixins = obj.$mixins
  if(mixins)
    for(var k in mixins) {
      mixins[k] = lessHelper.getMixin(mixins[k])
    }
  return walkObj(obj)
}


module.exports = {
  transform: transform,
  parse: parseExpression
}

