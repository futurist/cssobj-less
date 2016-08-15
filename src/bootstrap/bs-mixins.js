// bs-mixins


var obj = {
  // scaffolding
  '.tab-focus': {
    outline: '5px auto -webkit-focus-ring-color',
    outlineOffset: '-2px'
  },
  '.img-responsive': {
    $vars:{
      '@display': 'block'
    },
    display: '@display',
    maxWidth: '100%',
    height: 'auto'
  },

  // alert
  '.alert-variant': {
    $vars: {
      'background': '',
      'border': '',
      'text-color': ''
    },
    backgroundColor: '@background',
    borderColor: '@border',
    color: '@text-color',
    hr: {
      borderTopColor: 'darken(@border, 5%)'
    },
    '.alert-link': {
      color: 'darken(@text-color, 10%)'
    }
  }
}


module.exports = obj
