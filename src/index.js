
var extend = require('objutil').extend
var normalize = require('./normalize.js')
var scaffolding = require('./scaffolding.js')
var alert = require('./alert.js')
var $vars = require('./bs-vars.js')
var lessHelper = require('./less-helper.js')

// extend will overwrite normalize rule
// make it seperate cssobj first
cssobj(normalize)

var obj = extend(
  //css for page
  {
    'body ': {
      padding: '10px'
    },
    '#control': {
      marginBottom: '20px',
      span:{
        paddingLeft: '10px'
      }
    },
    input: {
      width: '100px'
    },
    'input[disabled]':{
      width: '140px',
      border:'none',
      background:'none'
    }
  }
  //css from bootstrap
  // scaffolding,
  // alert
)

var result = cssobj(obj, {
  local:{prefix:'my-prefix-'},
  onUpdate: cssobj_plugin_post_csstext(function(v) {
    // console.log(v)
  }),
  plugins:{
    value: lessHelper.lessValuePlugin()
  }
})

console.log(result)


var $ = function(sel) {
  return document.getElementById(sel)
}

// console.log($vars['font-size-base'])
// console.log($vars['alert-padding'])
// console.log($vars['border-radius-base'])
// console.log($vars['state-success-bg'])
// console.log($vars['state-success-text'])

var inter, TIME=60
function updateCSS() {
  clearTimeout(inter)
  inter = setTimeout(function() {
    result.update()
  }, TIME)
}

window.onload = function() {
  ![
    'font-size-base',
    'border-radius-base',
    'alert-padding',
    'state-success-bg',
    'state-success-text'
  ].forEach(function(v, i) {
    var val = $vars[v]
    $(v).value = val.charAt(0)=='#' ? val: parseInt(val)
    $(v).onchange = function() {
      $('val'+i).innerHTML = $vars[v] = this.value + (this.getAttribute('data-unit')||'')
      updateCSS()
    }
    $(v).onchange()
  })
}


var str = 'ceil((@font-size-base * -1.7))'

str = '(ceil((8.2 - 3)) + (3 + 2))'

var arr = []

parseStr('darken(#fff, 30%)', arr)

function applyArr(arr) {
  return typeof arr[0]=='function'
    ? arr[0].apply(null, arr.slice(1).map(function(v) {
      return Array.isArray(v) ? applyArr(v) : v
    }))
  : arr[0]
}

console.log( 3333, arr[0], applyArr(arr[0])() )

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
  if (match) {
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
  return callArr
}


