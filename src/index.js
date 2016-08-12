
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
      border:'none'
    }
  },
  //css from bootstrap
  scaffolding,
  alert
)

var result = cssobj(obj, {
  local:{prefix:'my-prefix-'},
  onUpdate: cssobj_plugin_post_csstext(function(v) {
    console.log(v)
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


var str = 'ceil((@font-size-base * 1.7))'


function splitComma (str, comma) {
  var sep = []
  for (var c, i = 0, n = 0, prev = 0, d = []; c = str.charAt(i); i++) {
    if (c == '(' || c == '[') n++
    if (c == ')' || c == ']') n--
    if (!n && comma.test(c)) d.push(str.substring(prev, i), c), prev = i + 1
  }
  return d.concat(str.substring(prev))
}

console.log( 3333, parseStr(str) )

function parseStr(val, paramN) {
  var rs = '', args, prefix=paramN > 0? ',' : ''

  val += ''


  // val = ColorNames[val] || val

  // color #333
  var match = val.match(/^\s*#([0-9A-F]+)(.*)$/i)
  if(match) return prefix + match[1] + parseStr(match[2]) //new Color(val.slice(1))

  // color rgba()
  var match = val.match(/^\s*rgba?\(([^)]*)\)(.*)$/i)
  if(match) {
    var alpha=1, rgba = match[1].split(',')
    var rgb = rgba.length>3 ? (alpha=rgba.pop(), rgba) : rgba
    return prefix + match[1] + parseStr(match[2]) // new Color(rgb, alpha)
  }

  // dimension 10px
  var match = val.match(/^([0-9.-]+)([a-z%]*)(.*)$/i)
  if(match) return prefix + match[1] + (match[2]||'') + parseStr(match[3]) // new Dimension(match[1], match[2])

  // ceil()
  var match = val.match(/^\s*([a-z]+)\((.*)\s*$/i)
  if(match) {
    return prefix + 'getFuncion("'+match[1]+ '"' + parseStr(match[2], 1)
  }

  // ceil()
  var match = val.match(/^\s*\((.*)\s*$/i)
  if(match) {
    return prefix + 'Operation(' + parseStr(match[1], 0)
  }

  // +-*/
  var match = val.match(/^\s*([\+\-\*\/])(.*)\s*$/)
  if (match) {
    return prefix + '"-'+match[1]+'-"' + parseStr(match[2])
  }

  // @var
  var match = val.match(/^\s*(@[a-z0-9$-]+)(.*)\s*$/i)
  if(match) {
    return prefix + 'getVar("'+match[1]+'")' + parseStr(match[2])
  }

  if(/^[\s)]*$/.test(val)) return val

  // var func = val.match(/^\s*([a-z]+)\((.*)\)(.*)\s*$/i)
  // if(0&&func) {
  //   rs += 'getFuncion("'+ m[1] +'"'
  //   args = splitComma(m[2], /,/)
  //   for(var i = 0; i < args.length; i+=2) {
  //     rs += parseStr(args[i]) + (args[i+1]||'')
  //   }
  //   rs += ')'
  // }

  // // (2px + 3px)
  // var operate = val.match(/^\s*\((.*)\)(.*)\s*$/)
  // var operateRe = /^\s*[+-*/]\s*/
  // if(0&&operate) {
  //   args = splitComma(operate[1], operateRe)
  //   rs += args.map(function(v) {
  //     return parseStr(v)
  //   }).reduce(function(prev, cur) {
  //     if(prev.length%3 == 0) prev.push('Operation(' + cur)
  //     if(prev.length%3 == 1) prev.push(cur)
  //     if(prev.length%3 == 2) prev.push(cur + ')')
  //   }, []).join('')
  // }

  return val
}


