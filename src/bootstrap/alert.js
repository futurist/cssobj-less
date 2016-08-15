var obj = {
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
    paddingRight: '(@alert-padding + 20)',
    '.close': {
      position: 'relative',
      top: '-2px',
      right: '-21px',
      color: 'inherit'
    }
  },
  '.alert-success': {
    $mixin: {
      '.alert-variant': ['@alert-success-bg', '@alert-success-border', '@alert-success-text']
    }
  },
  '.alert-info': {
    $mixin: {'.alert-variant': ['@alert-info-bg', '@alert-info-border', '@alert-info-text']}
  },
  '.alert-warning': {
    $mixin: {'.alert-variant': ['@alert-warning-bg', '@alert-warning-border', '@alert-warning-text']}
  },
  '.alert-danger': {
    $mixin: {'.alert-variant': ['@alert-danger-bg', '@alert-danger-border', '@alert-danger-text']}
  }
}

module.exports = obj
