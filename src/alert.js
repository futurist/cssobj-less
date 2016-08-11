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
  '.alert-variant': getMixin({
    $vars: {
      'background': '',
      'border': '',
      'text-color': ''
    },
    backgroundColor: '@background',
    borderColor: '@border',
    color: '@text-color',
    hr: {
      color: 'red',
      borderTopColor: getFuncion('darken', '@border', '5%')
    },
    '.alert-link': {
      color: getFuncion('darken', '@text-color', '10%')
    }
  })
}


var obj = {
  $vars: $vars,
  '.alert': {
    padding: '@alert-padding',
    marginBottom: '@line-height-computed',
    border: '1px solid transparent',
    borderRadius: '@alert-border-radius',
    h4: {
      marginTop: 0,
      color: 'inherit'
    },
    '.alert-link': {
      fontWeight: '@alert-link-font-weight'
    },
    '> p,   > ul': {
      marginBottom: 0
    },
    '> p + p': {
      marginTop: '5px'
    }
  },
  '.alert-dismissable,  .alert-dismissible': {
    paddingRight: Operation('+', '@alert-padding', ['-', '@alert-padding', ['+', 5, 10]]),
    '.close': {
      position: 'relative',
      top: '-2px',
      right: '-21px',
      color: 'inherit'
    }
  },
  '.alert-success': mixin({},
    $mixins['.alert-variant']('@alert-success-bg', '@alert-success-border', '@alert-success-text')
  ),
  '.alert-info': mixin({},
    $mixins['.alert-variant']('@alert-info-bg', '@alert-info-border', '@alert-info-text')
  ),
  '.alert-warning': mixin({},
    $mixins['.alert-variant']('@alert-warning-bg', '@alert-warning-border', '@alert-warning-text')
  ),
  '.alert-danger': mixin({},
    $mixins['.alert-variant']('@alert-danger-bg', '@alert-danger-border', '@alert-danger-text')
  )
}

var result = cssobj(obj, {
  local:false,
  onUpdate: cssobj_plugin_post_csstext(function(v) {
    console.log(v)
  }),
  plugins:{
    value: lessValuePlugin()
  }
})

console.log(result)
