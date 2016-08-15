
var extend = require('objutil').extend
var lessHelper = require('./less-helper.js')
var parser = require('./less-parser.js')

var $vars = require('./bs-vars.js')
var $mixins = require('./bs-mixins.js')

var normalize = require('./normalize.js')
var scaffolding = require('./scaffolding.js')
var alert = require('./alert.js')

// extend will overwrite normalize rule
// make it seperate cssobj first
cssobj(normalize)

var obj = extend (
  //css for page
  {
    $vars:extend({
      'padding': '112px'
    }, $vars),
    $mixins: $mixins,
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
      width: '10em',
      border:'none',
      background:'none'
    }
  },
  //css from bootstrap
  scaffolding,
  alert
)

parser.transform(obj)

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
    var val = result.obj.$vars[v]
    $(v).value = val.charAt(0)=='#' ? val: parseInt(val)
    $(v).onchange = function() {
      $('val'+i).innerHTML = result.obj.$vars[v] = this.value + (this.getAttribute('data-unit')||'')
      updateCSS()
    }
    $(v).onchange()
  })
}

