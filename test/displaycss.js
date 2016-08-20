  function displaycss(callback) {

    var cb = function(str) {
      typeof callback=='function' && callback(str)
    }

    return function getCSSText(result) {

      var dom = result.cssdom

      if(!dom) return cb(''), result
      var sheet = dom.sheet || dom.styleSheet
      if(sheet.cssText) return cb(sheet.cssText), result

      var str = ''
      var rules = sheet.cssRules || sheet.rules
      for(var i = 0, len = rules.length; i < len; i++) {
        str += rules[i].cssText + '\n'
      }

      return cb(str), result
    }
  }

