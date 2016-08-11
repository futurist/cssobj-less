var lessHelper = require('./less-helper.js')

var getVar =  lessHelper.getVar,
    getObj =  lessHelper.getObj,
    getFuncion =  lessHelper.getFuncion,
    getMixin =  lessHelper.getMixin,
    Operation =  lessHelper.Operation,
    mixin =  lessHelper.mixin,
    lessValuePlugin =  lessHelper.lessValuePlugin

var $vars = require('./bs-vars.js')

var $mixins = {
  '.tab-focus': getMixin({
    outline: '5px auto -webkit-focus-ring-color',
    outlineOffset: '-2px'
  }),
  '.img-responsive': getMixin({
    $vars:{
      '@display': 'block'
    },
    display: '@display',
    maxWidth: '100%',
    height: 'auto'
  })
}


var obj = {
  $vars: $vars,
  '*': {
    'boxSizing': 'border-box'
  },
  '*:before, *:after': {
    'boxSizing': 'border-box'
  },
  html: {
    fontSize: '10px',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)'
  },
  body: {
    fontFamily: '@font-family-base',
    fontSize: '@font-size-base',
    lineHeight: '@line-height-base',
    color: '@text-color',
    backgroundColor: '@body-bg'
  },
  'input, button, select, textarea': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  },
  a: {
    color: '@link-color',
    textDecoration: 'none',
    '&:hover,   &:focus': {
      color: '@link-hover-color',
      textDecoration: '@link-hover-decoration'
    },
    '&:focus': mixin({}, $mixins['.tab-focus']())
  },
  figure: {
    margin: 0
  },
  img: {
    verticalAlign: 'middle'
  },
  '.img-responsive': mixin({}, $mixins['.img-responsive']()),
  '.img-rounded': {
    borderRadius: '@border-radius-large'
  },
  '.img-thumbnail': mixin({
    padding: '@thumbnail-padding',
    lineHeight: '@line-height-base',
    backgroundColor: '@thumbnail-bg',
    border: '1px solid @thumbnail-border',
    borderRadius: '@thumbnail-border-radius',
    transition: 'all .2s ease-in-out'
  }, $mixins['.img-responsive']('inline-block')),
  '.img-circle': {
    borderRadius: '50%'
  },
  hr: {
    marginTop: '@line-height-computed',
    marginBottom: '@line-height-computed',
    border: 0,
    borderTop: '1px solid @hr-border'
  },
  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  },
  '.sr-only-focusable': {
    '&:active,   &:focus': {
      position: 'static',
      width: 'auto',
      height: 'auto',
      margin: 0,
      overflow: 'visible',
      clip: 'auto'
    }
  },
  '[role="button"]': {
    cursor: 'pointer'
  }
}

module.exports = obj
