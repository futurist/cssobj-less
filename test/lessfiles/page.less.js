var page = {
  '$vars': {
    base: '#f938ab',
    width: '100px',
    padding: '10px'
  },
  '.box': {
    width: '(@width * 2)',
    padding: '@padding',
    color: 'saturate(@base, 5%)',
    borderColor: 'lighten(@base, 30%)',
    div: {
      '$mixin': {
        '.box-shadow': ['0 0 5px', 0.3]
      }
    }
  },
  '$mixins': {
    '.box-shadow': {
      '$vars': {
        style: '',
        alpha: '50%'
      },
      boxShadow: '@style rgba(0, 0, 0, @alpha)'
    }
  }
}
