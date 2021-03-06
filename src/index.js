
var merge = require('objutil').merge
var lessobj = require('./lessobj.js')

var $vars = require('./bootstrap/bs-vars.js')
var $mixins = require('./bootstrap/bs-mixins.js')
var normalize = require('./bootstrap/normalize.js')
var scaffolding = require('./bootstrap/scaffolding.js')
var alert = require('./bootstrap/alert.js')

// merge will overwrite normalize rule
// make it seperate cssobj first
// lessobj(normalize)

var obj = merge (
  //css for page
  {
    $vars:merge({
      'state1-success-bg': '#dff0d8',
      padding: '10px',
      // fontFamily: '"s  adf", asdf',
      // border: '1px solid black',
      content2: 'escape(\'a=1\')',
      color2: 'darken(spin(#dff0d8, -10), 5%)'
    }, $vars),
    $mixins: $mixins,
    'body ': {
      padding: '@padding',
      margin: '@padding 0'
    },
    '#control': {
      $extend: 'body ',
      marginBottom: '20px',
      span:{
        paddingLeft: '10px'
      }
    },
    input: {
      width: '100px'
    },
    'input[disabled]':{
      width: '10em',
      border:'none',
      background:'none'
    }
  },
  //css from bootstrap
  scaffolding,
  alert
)

var result = lessobj(obj, {
  local:{prefix:'my-prefix-'},
  onUpdate: displaycss(function(v) {
    console.log(v)
  })
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
    var val = result.obj.$vars[v]
    $(v).value = val.charAt(0)=='#' ? val: parseInt(val)
    $(v).onchange = function() {
      $('val'+i).innerHTML = result.obj.$vars[v] = this.value + (this.getAttribute('data-unit')||'')
      updateCSS()
    }
    $(v).onchange()
  })
}

