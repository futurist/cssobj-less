(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var contexts = {};
module.exports = contexts;

var copyFromOriginal = function copyFromOriginal(original, destination, propertiesToCopy) {
    if (!original) { return; }

    for (var i = 0; i < propertiesToCopy.length; i++) {
        if (original.hasOwnProperty(propertiesToCopy[i])) {
            destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
        }
    }
};

/*
 parse is used whilst parsing
 */
var parseCopyProperties = [
    // options
    'paths',            // option - unmodified - paths to search for imports on
    'relativeUrls',     // option - whether to adjust URL's to be relative
    'rootpath',         // option - rootpath to append to URL's
    'strictImports',    // option -
    'insecure',         // option - whether to allow imports from insecure ssl hosts
    'dumpLineNumbers',  // option - whether to dump line numbers
    'compress',         // option - whether to compress
    'syncImport',       // option - whether to import synchronously
    'chunkInput',       // option - whether to chunk input. more performant but causes parse issues.
    'mime',             // browser only - mime type for sheet import
    'useFileCache',     // browser only - whether to use the per file session cache
    // context
    'processImports',   // option & context - whether to process imports. if false then imports will not be imported.
                        // Used by the import manager to stop multiple import visitors being created.
    'pluginManager'     // Used as the plugin manager for the session
];

contexts.Parse = function(options) {
    copyFromOriginal(options, this, parseCopyProperties);

    if (typeof this.paths === "string") { this.paths = [this.paths]; }
};

var evalCopyProperties = [
    'paths',          // additional include paths
    'compress',       // whether to compress
    'ieCompat',       // whether to enforce IE compatibility (IE8 data-uri)
    'strictMath',     // whether math has to be within parenthesis
    'strictUnits',    // whether units need to evaluate correctly
    'sourceMap',      // whether to output a source map
    'importMultiple', // whether we are currently importing multiple copies
    'urlArgs',        // whether to add args into url tokens
    'javascriptEnabled',// option - whether JavaScript is enabled. if undefined, defaults to true
    'pluginManager',  // Used as the plugin manager for the session
    'importantScope'  // used to bubble up !important statements
    ];

contexts.Eval = function(options, frames) {
    copyFromOriginal(options, this, evalCopyProperties);

    if (typeof this.paths === "string") { this.paths = [this.paths]; }

    this.frames = frames || [];
    this.importantScope = this.importantScope || [];
};

contexts.Eval.prototype.inParenthesis = function () {
    if (!this.parensStack) {
        this.parensStack = [];
    }
    this.parensStack.push(true);
};

contexts.Eval.prototype.outOfParenthesis = function () {
    this.parensStack.pop();
};

contexts.Eval.prototype.isMathOn = function () {
    return this.strictMath ? (this.parensStack && this.parensStack.length) : true;
};

contexts.Eval.prototype.isPathRelative = function (path) {
    return !/^(?:[a-z-]+:|\/|#)/i.test(path);
};

contexts.Eval.prototype.normalizePath = function( path ) {
    var
      segments = path.split("/").reverse(),
      segment;

    path = [];
    while (segments.length !== 0 ) {
        segment = segments.pop();
        switch( segment ) {
            case ".":
                break;
            case "..":
                if ((path.length === 0) || (path[path.length - 1] === "..")) {
                    path.push( segment );
                } else {
                    path.pop();
                }
                break;
            default:
                path.push( segment );
                break;
        }
    }

    return path.join("/");
};

//todo - do the same for the toCSS ?

},{}],2:[function(require,module,exports){
module.exports = {
    'aliceblue':'#f0f8ff',
    'antiquewhite':'#faebd7',
    'aqua':'#00ffff',
    'aquamarine':'#7fffd4',
    'azure':'#f0ffff',
    'beige':'#f5f5dc',
    'bisque':'#ffe4c4',
    'black':'#000000',
    'blanchedalmond':'#ffebcd',
    'blue':'#0000ff',
    'blueviolet':'#8a2be2',
    'brown':'#a52a2a',
    'burlywood':'#deb887',
    'cadetblue':'#5f9ea0',
    'chartreuse':'#7fff00',
    'chocolate':'#d2691e',
    'coral':'#ff7f50',
    'cornflowerblue':'#6495ed',
    'cornsilk':'#fff8dc',
    'crimson':'#dc143c',
    'cyan':'#00ffff',
    'darkblue':'#00008b',
    'darkcyan':'#008b8b',
    'darkgoldenrod':'#b8860b',
    'darkgray':'#a9a9a9',
    'darkgrey':'#a9a9a9',
    'darkgreen':'#006400',
    'darkkhaki':'#bdb76b',
    'darkmagenta':'#8b008b',
    'darkolivegreen':'#556b2f',
    'darkorange':'#ff8c00',
    'darkorchid':'#9932cc',
    'darkred':'#8b0000',
    'darksalmon':'#e9967a',
    'darkseagreen':'#8fbc8f',
    'darkslateblue':'#483d8b',
    'darkslategray':'#2f4f4f',
    'darkslategrey':'#2f4f4f',
    'darkturquoise':'#00ced1',
    'darkviolet':'#9400d3',
    'deeppink':'#ff1493',
    'deepskyblue':'#00bfff',
    'dimgray':'#696969',
    'dimgrey':'#696969',
    'dodgerblue':'#1e90ff',
    'firebrick':'#b22222',
    'floralwhite':'#fffaf0',
    'forestgreen':'#228b22',
    'fuchsia':'#ff00ff',
    'gainsboro':'#dcdcdc',
    'ghostwhite':'#f8f8ff',
    'gold':'#ffd700',
    'goldenrod':'#daa520',
    'gray':'#808080',
    'grey':'#808080',
    'green':'#008000',
    'greenyellow':'#adff2f',
    'honeydew':'#f0fff0',
    'hotpink':'#ff69b4',
    'indianred':'#cd5c5c',
    'indigo':'#4b0082',
    'ivory':'#fffff0',
    'khaki':'#f0e68c',
    'lavender':'#e6e6fa',
    'lavenderblush':'#fff0f5',
    'lawngreen':'#7cfc00',
    'lemonchiffon':'#fffacd',
    'lightblue':'#add8e6',
    'lightcoral':'#f08080',
    'lightcyan':'#e0ffff',
    'lightgoldenrodyellow':'#fafad2',
    'lightgray':'#d3d3d3',
    'lightgrey':'#d3d3d3',
    'lightgreen':'#90ee90',
    'lightpink':'#ffb6c1',
    'lightsalmon':'#ffa07a',
    'lightseagreen':'#20b2aa',
    'lightskyblue':'#87cefa',
    'lightslategray':'#778899',
    'lightslategrey':'#778899',
    'lightsteelblue':'#b0c4de',
    'lightyellow':'#ffffe0',
    'lime':'#00ff00',
    'limegreen':'#32cd32',
    'linen':'#faf0e6',
    'magenta':'#ff00ff',
    'maroon':'#800000',
    'mediumaquamarine':'#66cdaa',
    'mediumblue':'#0000cd',
    'mediumorchid':'#ba55d3',
    'mediumpurple':'#9370d8',
    'mediumseagreen':'#3cb371',
    'mediumslateblue':'#7b68ee',
    'mediumspringgreen':'#00fa9a',
    'mediumturquoise':'#48d1cc',
    'mediumvioletred':'#c71585',
    'midnightblue':'#191970',
    'mintcream':'#f5fffa',
    'mistyrose':'#ffe4e1',
    'moccasin':'#ffe4b5',
    'navajowhite':'#ffdead',
    'navy':'#000080',
    'oldlace':'#fdf5e6',
    'olive':'#808000',
    'olivedrab':'#6b8e23',
    'orange':'#ffa500',
    'orangered':'#ff4500',
    'orchid':'#da70d6',
    'palegoldenrod':'#eee8aa',
    'palegreen':'#98fb98',
    'paleturquoise':'#afeeee',
    'palevioletred':'#d87093',
    'papayawhip':'#ffefd5',
    'peachpuff':'#ffdab9',
    'peru':'#cd853f',
    'pink':'#ffc0cb',
    'plum':'#dda0dd',
    'powderblue':'#b0e0e6',
    'purple':'#800080',
    'rebeccapurple':'#663399',
    'red':'#ff0000',
    'rosybrown':'#bc8f8f',
    'royalblue':'#4169e1',
    'saddlebrown':'#8b4513',
    'salmon':'#fa8072',
    'sandybrown':'#f4a460',
    'seagreen':'#2e8b57',
    'seashell':'#fff5ee',
    'sienna':'#a0522d',
    'silver':'#c0c0c0',
    'skyblue':'#87ceeb',
    'slateblue':'#6a5acd',
    'slategray':'#708090',
    'slategrey':'#708090',
    'snow':'#fffafa',
    'springgreen':'#00ff7f',
    'steelblue':'#4682b4',
    'tan':'#d2b48c',
    'teal':'#008080',
    'thistle':'#d8bfd8',
    'tomato':'#ff6347',
    'turquoise':'#40e0d0',
    'violet':'#ee82ee',
    'wheat':'#f5deb3',
    'white':'#ffffff',
    'whitesmoke':'#f5f5f5',
    'yellow':'#ffff00',
    'yellowgreen':'#9acd32'
};
},{}],3:[function(require,module,exports){
module.exports = {
    length: {
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'in': 0.0254,
        'px': 0.0254 / 96,
        'pt': 0.0254 / 72,
        'pc': 0.0254 / 72 * 12
    },
    duration: {
        's': 1,
        'ms': 0.001
    },
    angle: {
        'rad': 1 / (2 * Math.PI),
        'deg': 1 / 360,
        'grad': 1 / 400,
        'turn': 1
    }
};
},{}],4:[function(require,module,exports){
var Color = require("../tree/color"),
    functionRegistry = require("./function-registry");

// Color Blending
// ref: http://www.w3.org/TR/compositing-1

function colorBlend(mode, color1, color2) {
    var ab = color1.alpha, cb, // backdrop
        as = color2.alpha, cs, // source
        ar, cr, r = [];        // result

    ar = as + ab * (1 - as);
    for (var i = 0; i < 3; i++) {
        cb = color1.rgb[i] / 255;
        cs = color2.rgb[i] / 255;
        cr = mode(cb, cs);
        if (ar) {
            cr = (as * cs + ab * (cb -
                  as * (cb + cs - cr))) / ar;
        }
        r[i] = cr * 255;
    }

    return new Color(r, ar);
}

var colorBlendModeFunctions = {
    multiply: function(cb, cs) {
        return cb * cs;
    },
    screen: function(cb, cs) {
        return cb + cs - cb * cs;
    },
    overlay: function(cb, cs) {
        cb *= 2;
        return (cb <= 1) ?
            colorBlendModeFunctions.multiply(cb, cs) :
            colorBlendModeFunctions.screen(cb - 1, cs);
    },
    softlight: function(cb, cs) {
        var d = 1, e = cb;
        if (cs > 0.5) {
            e = 1;
            d = (cb > 0.25) ? Math.sqrt(cb)
                : ((16 * cb - 12) * cb + 4) * cb;
        }
        return cb - (1 - 2 * cs) * e * (d - cb);
    },
    hardlight: function(cb, cs) {
        return colorBlendModeFunctions.overlay(cs, cb);
    },
    difference: function(cb, cs) {
        return Math.abs(cb - cs);
    },
    exclusion: function(cb, cs) {
        return cb + cs - 2 * cb * cs;
    },

    // non-w3c functions:
    average: function(cb, cs) {
        return (cb + cs) / 2;
    },
    negation: function(cb, cs) {
        return 1 - Math.abs(cb + cs - 1);
    }
};

for (var f in colorBlendModeFunctions) {
    if (colorBlendModeFunctions.hasOwnProperty(f)) {
        colorBlend[f] = colorBlend.bind(null, colorBlendModeFunctions[f]);
    }
}

functionRegistry.addMultiple(colorBlend);

},{"../tree/color":19,"./function-registry":9}],5:[function(require,module,exports){
var Dimension = require("../tree/dimension"),
    Color = require("../tree/color"),
    Quoted = require("../tree/quoted"),
    Anonymous = require("../tree/anonymous"),
    functionRegistry = require("./function-registry"),
    colorFunctions;

function clamp(val) {
    return Math.min(1, Math.max(0, val));
}
function hsla(color) {
    return colorFunctions.hsla(color.h, color.s, color.l, color.a);
}
function number(n) {
    if (n instanceof Dimension) {
        return parseFloat(n.unit.is('%') ? n.value / 100 : n.value);
    } else if (typeof n === 'number') {
        return n;
    } else {
        throw {
            type: "Argument",
            message: "color functions take numbers as parameters"
        };
    }
}
function scaled(n, size) {
    if (n instanceof Dimension && n.unit.is('%')) {
        return parseFloat(n.value * size / 100);
    } else {
        return number(n);
    }
}
colorFunctions = {
    rgb: function (r, g, b) {
        return colorFunctions.rgba(r, g, b, 1.0);
    },
    rgba: function (r, g, b, a) {
        var rgb = [r, g, b].map(function (c) { return scaled(c, 255); });
        a = number(a);
        return new Color(rgb, a);
    },
    hsl: function (h, s, l) {
        return colorFunctions.hsla(h, s, l, 1.0);
    },
    hsla: function (h, s, l, a) {

        var m1, m2;

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if (h * 6 < 1) {
                return m1 + (m2 - m1) * h * 6;
            }
            else if (h * 2 < 1) {
                return m2;
            }
            else if (h * 3 < 2) {
                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            }
            else {
                return m1;
            }
        }

        h = (number(h) % 360) / 360;
        s = clamp(number(s)); l = clamp(number(l)); a = clamp(number(a));

        m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        m1 = l * 2 - m2;

        return colorFunctions.rgba(hue(h + 1 / 3) * 255,
            hue(h)       * 255,
            hue(h - 1 / 3) * 255,
            a);
    },

    hsv: function(h, s, v) {
        return colorFunctions.hsva(h, s, v, 1.0);
    },

    hsva: function(h, s, v, a) {
        h = ((number(h) % 360) / 360) * 360;
        s = number(s); v = number(v); a = number(a);

        var i, f;
        i = Math.floor((h / 60) % 6);
        f = (h / 60) - i;

        var vs = [v,
            v * (1 - s),
            v * (1 - f * s),
            v * (1 - (1 - f) * s)];
        var perm = [[0, 3, 1],
            [2, 0, 1],
            [1, 0, 3],
            [1, 2, 0],
            [3, 1, 0],
            [0, 1, 2]];

        return colorFunctions.rgba(vs[perm[i][0]] * 255,
            vs[perm[i][1]] * 255,
            vs[perm[i][2]] * 255,
            a);
    },

    hue: function (color) {
        return new Dimension(color.toHSL().h);
    },
    saturation: function (color) {
        return new Dimension(color.toHSL().s * 100, '%');
    },
    lightness: function (color) {
        return new Dimension(color.toHSL().l * 100, '%');
    },
    hsvhue: function(color) {
        return new Dimension(color.toHSV().h);
    },
    hsvsaturation: function (color) {
        return new Dimension(color.toHSV().s * 100, '%');
    },
    hsvvalue: function (color) {
        return new Dimension(color.toHSV().v * 100, '%');
    },
    red: function (color) {
        return new Dimension(color.rgb[0]);
    },
    green: function (color) {
        return new Dimension(color.rgb[1]);
    },
    blue: function (color) {
        return new Dimension(color.rgb[2]);
    },
    alpha: function (color) {
        return new Dimension(color.toHSL().a);
    },
    luma: function (color) {
        return new Dimension(color.luma() * color.alpha * 100, '%');
    },
    luminance: function (color) {
        var luminance =
            (0.2126 * color.rgb[0] / 255) +
                (0.7152 * color.rgb[1] / 255) +
                (0.0722 * color.rgb[2] / 255);

        return new Dimension(luminance * color.alpha * 100, '%');
    },
    saturate: function (color, amount, method) {
        // filter: saturate(3.2);
        // should be kept as is, so check for color
        if (!color.rgb) {
            return null;
        }
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.s +=  hsl.s * amount.value / 100;
        }
        else {
            hsl.s += amount.value / 100;
        }
        hsl.s = clamp(hsl.s);
        return hsla(hsl);
    },
    desaturate: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.s -=  hsl.s * amount.value / 100;
        }
        else {
            hsl.s -= amount.value / 100;
        }
        hsl.s = clamp(hsl.s);
        return hsla(hsl);
    },
    lighten: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.l +=  hsl.l * amount.value / 100;
        }
        else {
            hsl.l += amount.value / 100;
        }
        hsl.l = clamp(hsl.l);
        return hsla(hsl);
    },
    darken: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.l -=  hsl.l * amount.value / 100;
        }
        else {
            hsl.l -= amount.value / 100;
        }
        hsl.l = clamp(hsl.l);
        return hsla(hsl);
    },
    fadein: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.a +=  hsl.a * amount.value / 100;
        }
        else {
            hsl.a += amount.value / 100;
        }
        hsl.a = clamp(hsl.a);
        return hsla(hsl);
    },
    fadeout: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.a -=  hsl.a * amount.value / 100;
        }
        else {
            hsl.a -= amount.value / 100;
        }
        hsl.a = clamp(hsl.a);
        return hsla(hsl);
    },
    fade: function (color, amount) {
        var hsl = color.toHSL();

        hsl.a = amount.value / 100;
        hsl.a = clamp(hsl.a);
        return hsla(hsl);
    },
    spin: function (color, amount) {
        var hsl = color.toHSL();
        var hue = (hsl.h + amount.value) % 360;

        hsl.h = hue < 0 ? 360 + hue : hue;

        return hsla(hsl);
    },
    //
    // Copyright (c) 2006-2009 Hampton Catlin, Natalie Weizenbaum, and Chris Eppstein
    // http://sass-lang.com
    //
    mix: function (color1, color2, weight) {
        if (!color1.toHSL || !color2.toHSL) {
            console.log(color2.type);
            console.dir(color2);
        }
        if (!weight) {
            weight = new Dimension(50);
        }
        var p = weight.value / 100.0;
        var w = p * 2 - 1;
        var a = color1.toHSL().a - color2.toHSL().a;

        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;

        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
            color1.rgb[1] * w1 + color2.rgb[1] * w2,
            color1.rgb[2] * w1 + color2.rgb[2] * w2];

        var alpha = color1.alpha * p + color2.alpha * (1 - p);

        return new Color(rgb, alpha);
    },
    greyscale: function (color) {
        return colorFunctions.desaturate(color, new Dimension(100));
    },
    contrast: function (color, color1, color2, threshold) {
        // Return which of `color1` and `color2` has the greatest contrast with `color`
        // according to the standard WCAG contrast ratio calculation.
        // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
        // The threshold param is no longer used, in line with SASS.
        // filter: contrast(3.2);
        // should be kept as is, so check for color
        if (!color.rgb) {
            return null;
        }
        if (typeof color1 === 'undefined') {
            color1 = colorFunctions.rgba(0, 0, 0, 1.0);
        }
        if (typeof color2 === 'undefined') {
            color2 = colorFunctions.rgba(255, 255, 255, 1.0);
        }
        var contrast1, contrast2;
        var luma = color.luma();
        var luma1 = color1.luma();
        var luma2 = color2.luma();
        // Calculate contrast ratios for each color
        if (luma > luma1) {
            contrast1 = (luma + 0.05) / (luma1 + 0.05);
        } else {
            contrast1 = (luma1 + 0.05) / (luma + 0.05);
        }
        if (luma > luma2) {
            contrast2 = (luma + 0.05) / (luma2 + 0.05);
        } else {
            contrast2 = (luma2 + 0.05) / (luma + 0.05);
        }
        if (contrast1 > contrast2) {
            return color1;
        } else {
            return color2;
        }
    },
    argb: function (color) {
        return new Anonymous(color.toARGB());
    },
    color: function(c) {
        if ((c instanceof Quoted) &&
            (/^#([a-f0-9]{6}|[a-f0-9]{3})$/i.test(c.value))) {
            return new Color(c.value.slice(1));
        }
        if ((c instanceof Color) || (c = Color.fromKeyword(c.value))) {
            c.value = undefined;
            return c;
        }
        throw {
            type:    "Argument",
            message: "argument must be a color keyword or 3/6 digit hex e.g. #FFF"
        };
    },
    tint: function(color, amount) {
        return colorFunctions.mix(colorFunctions.rgb(255, 255, 255), color, amount);
    },
    shade: function(color, amount) {
        return colorFunctions.mix(colorFunctions.rgb(0, 0, 0), color, amount);
    }
};
functionRegistry.addMultiple(colorFunctions);

},{"../tree/anonymous":18,"../tree/color":19,"../tree/dimension":23,"../tree/quoted":31,"./function-registry":9}],6:[function(require,module,exports){
module.exports = function(environment) {
    var Quoted = require("../tree/quoted"),
        URL = require("../tree/url"),
        functionRegistry = require("./function-registry"),
        fallback = function(functionThis, node) {
            return new URL(node, functionThis.index, functionThis.currentFileInfo).eval(functionThis.context);
        },
        logger = require('../logger');

    functionRegistry.add("data-uri", function(mimetypeNode, filePathNode) {

        if (!filePathNode) {
            filePathNode = mimetypeNode;
            mimetypeNode = null;
        }

        var mimetype = mimetypeNode && mimetypeNode.value;
        var filePath = filePathNode.value;
        var currentFileInfo = this.currentFileInfo;
        var currentDirectory = currentFileInfo.relativeUrls ?
            currentFileInfo.currentDirectory : currentFileInfo.entryPath;

        var fragmentStart = filePath.indexOf('#');
        var fragment = '';
        if (fragmentStart !== -1) {
            fragment = filePath.slice(fragmentStart);
            filePath = filePath.slice(0, fragmentStart);
        }

        var fileManager = environment.getFileManager(filePath, currentDirectory, this.context, environment, true);

        if (!fileManager) {
            return fallback(this, filePathNode);
        }

        var useBase64 = false;

        // detect the mimetype if not given
        if (!mimetypeNode) {

            mimetype = environment.mimeLookup(filePath);

            if (mimetype === "image/svg+xml") {
                useBase64 = false;
            } else {
                // use base 64 unless it's an ASCII or UTF-8 format
                var charset = environment.charsetLookup(mimetype);
                useBase64 = ['US-ASCII', 'UTF-8'].indexOf(charset) < 0;
            }
            if (useBase64) { mimetype += ';base64'; }
        }
        else {
            useBase64 = /;base64$/.test(mimetype);
        }

        var fileSync = fileManager.loadFileSync(filePath, currentDirectory, this.context, environment);
        if (!fileSync.contents) {
            logger.warn("Skipped data-uri embedding of " + filePath + " because file not found");
            return fallback(this, filePathNode || mimetypeNode);
        }
        var buf = fileSync.contents;
        if (useBase64 && !environment.encodeBase64) {
            return fallback(this, filePathNode);
        }

        buf = useBase64 ? environment.encodeBase64(buf) : encodeURIComponent(buf);

        var uri = "data:" + mimetype + ',' + buf + fragment;

        // IE8 cannot handle a data-uri larger than 32,768 characters. If this is exceeded
        // and the --ieCompat flag is enabled, return a normal url() instead.
        var DATA_URI_MAX = 32768;
        if (uri.length >= DATA_URI_MAX) {

            if (this.context.ieCompat !== false) {
                logger.warn("Skipped data-uri embedding of " + filePath + " because its size (" + uri.length +
                    " characters) exceeds IE8-safe " + DATA_URI_MAX + " characters!");

                return fallback(this, filePathNode || mimetypeNode);
            }
        }

        return new URL(new Quoted('"' + uri + '"', uri, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
    });
};

},{"../logger":17,"../tree/quoted":31,"../tree/url":33,"./function-registry":9}],7:[function(require,module,exports){
var Keyword = require("../tree/keyword"),
    functionRegistry = require("./function-registry");

var defaultFunc = {
    eval: function () {
        var v = this.value_, e = this.error_;
        if (e) {
            throw e;
        }
        if (v != null) {
            return v ? Keyword.True : Keyword.False;
        }
    },
    value: function (v) {
        this.value_ = v;
    },
    error: function (e) {
        this.error_ = e;
    },
    reset: function () {
        this.value_ = this.error_ = null;
    }
};

functionRegistry.add("default", defaultFunc.eval.bind(defaultFunc));

module.exports = defaultFunc;

},{"../tree/keyword":27,"./function-registry":9}],8:[function(require,module,exports){
var Expression = require("../tree/expression");

var functionCaller = function(name, context, index, currentFileInfo) {
    this.name = name.toLowerCase();
    this.index = index;
    this.context = context;
    this.currentFileInfo = currentFileInfo;

    this.func = context.frames[0].functionRegistry.get(this.name);
};
functionCaller.prototype.isValid = function() {
    return Boolean(this.func);
};
functionCaller.prototype.call = function(args) {

    // This code is terrible and should be replaced as per this issue...
    // https://github.com/less/less.js/issues/2477
    if (Array.isArray(args)) {
        args = args.filter(function (item) {
            if (item.type === "Comment") {
                return false;
            }
            return true;
        })
        .map(function(item) {
            if (item.type === "Expression") {
                var subNodes = item.value.filter(function (item) {
                    if (item.type === "Comment") {
                        return false;
                    }
                    return true;
                });
                if (subNodes.length === 1) {
                    return subNodes[0];
                } else {
                    return new Expression(subNodes);
                }
            }
            return item;
        });
    }

    return this.func.apply(this, args);
};

module.exports = functionCaller;

},{"../tree/expression":24}],9:[function(require,module,exports){
function makeRegistry( base ) {
    return {
        _data: {},
        add: function(name, func) {
            // precautionary case conversion, as later querying of
            // the registry by function-caller uses lower case as well.
            name = name.toLowerCase();

            if (this._data.hasOwnProperty(name)) {
                //TODO warn
            }
            this._data[name] = func;
        },
        addMultiple: function(functions) {
            Object.keys(functions).forEach(
                function(name) {
                    this.add(name, functions[name]);
                }.bind(this));
        },
        get: function(name) {
            return this._data[name] || ( base && base.get( name ));
        },
        inherit : function() {
            return makeRegistry( this );
        }
    };
}

module.exports = makeRegistry( null );
},{}],10:[function(require,module,exports){
module.exports = function(environment) {
    var functions = {
        functionRegistry: require("./function-registry"),
        functionCaller: require("./function-caller")
    };

    //register functions
    require("./default");
    require("./color");
    require("./color-blending");
    require("./data-uri")(environment);
    require("./math");
    require("./number");
    require("./string");
    require("./svg")(environment);
    require("./types");

    return functions;
};

},{"./color":5,"./color-blending":4,"./data-uri":6,"./default":7,"./function-caller":8,"./function-registry":9,"./math":12,"./number":13,"./string":14,"./svg":15,"./types":16}],11:[function(require,module,exports){
var Dimension = require("../tree/dimension");

var MathHelper = function() {
};
MathHelper._math = function (fn, unit, n) {
    if (!(n instanceof Dimension)) {
        throw { type: "Argument", message: "argument must be a number" };
    }
    if (unit == null) {
        unit = n.unit;
    } else {
        n = n.unify();
    }
    return new Dimension(fn(parseFloat(n.value)), unit);
};
module.exports = MathHelper;
},{"../tree/dimension":23}],12:[function(require,module,exports){
var functionRegistry = require("./function-registry"),
    mathHelper = require("./math-helper.js");

var mathFunctions = {
    // name,  unit
    ceil:  null,
    floor: null,
    sqrt:  null,
    abs:   null,
    tan:   "",
    sin:   "",
    cos:   "",
    atan:  "rad",
    asin:  "rad",
    acos:  "rad"
};

for (var f in mathFunctions) {
    if (mathFunctions.hasOwnProperty(f)) {
        mathFunctions[f] = mathHelper._math.bind(null, Math[f], mathFunctions[f]);
    }
}

mathFunctions.round = function (n, f) {
    var fraction = typeof f === "undefined" ? 0 : f.value;
    return mathHelper._math(function(num) { return num.toFixed(fraction); }, null, n);
};

functionRegistry.addMultiple(mathFunctions);

},{"./function-registry":9,"./math-helper.js":11}],13:[function(require,module,exports){
var Dimension = require("../tree/dimension"),
    Anonymous = require("../tree/anonymous"),
    functionRegistry = require("./function-registry"),
    mathHelper = require("./math-helper.js");

var minMax = function (isMin, args) {
    args = Array.prototype.slice.call(args);
    switch(args.length) {
        case 0: throw { type: "Argument", message: "one or more arguments required" };
    }
    var i, j, current, currentUnified, referenceUnified, unit, unitStatic, unitClone,
        order  = [], // elems only contains original argument values.
        values = {}; // key is the unit.toString() for unified Dimension values,
    // value is the index into the order array.
    for (i = 0; i < args.length; i++) {
        current = args[i];
        if (!(current instanceof Dimension)) {
            if (Array.isArray(args[i].value)) {
                Array.prototype.push.apply(args, Array.prototype.slice.call(args[i].value));
            }
            continue;
        }
        currentUnified = current.unit.toString() === "" && unitClone !== undefined ? new Dimension(current.value, unitClone).unify() : current.unify();
        unit = currentUnified.unit.toString() === "" && unitStatic !== undefined ? unitStatic : currentUnified.unit.toString();
        unitStatic = unit !== "" && unitStatic === undefined || unit !== "" && order[0].unify().unit.toString() === "" ? unit : unitStatic;
        unitClone = unit !== "" && unitClone === undefined ? current.unit.toString() : unitClone;
        j = values[""] !== undefined && unit !== "" && unit === unitStatic ? values[""] : values[unit];
        if (j === undefined) {
            if (unitStatic !== undefined && unit !== unitStatic) {
                throw{ type: "Argument", message: "incompatible types" };
            }
            values[unit] = order.length;
            order.push(current);
            continue;
        }
        referenceUnified = order[j].unit.toString() === "" && unitClone !== undefined ? new Dimension(order[j].value, unitClone).unify() : order[j].unify();
        if ( isMin && currentUnified.value < referenceUnified.value ||
            !isMin && currentUnified.value > referenceUnified.value) {
            order[j] = current;
        }
    }
    if (order.length == 1) {
        return order[0];
    }
    args = order.map(function (a) { return a.toCSS(this.context); }).join(this.context.compress ? "," : ", ");
    return new Anonymous((isMin ? "min" : "max") + "(" + args + ")");
};
functionRegistry.addMultiple({
    min: function () {
        return minMax(true, arguments);
    },
    max: function () {
        return minMax(false, arguments);
    },
    convert: function (val, unit) {
        return val.convertTo(unit.value);
    },
    pi: function () {
        return new Dimension(Math.PI);
    },
    mod: function(a, b) {
        return new Dimension(a.value % b.value, a.unit);
    },
    pow: function(x, y) {
        if (typeof x === "number" && typeof y === "number") {
            x = new Dimension(x);
            y = new Dimension(y);
        } else if (!(x instanceof Dimension) || !(y instanceof Dimension)) {
            throw { type: "Argument", message: "arguments must be numbers" };
        }

        return new Dimension(Math.pow(x.value, y.value), x.unit);
    },
    percentage: function (n) {
        var result = mathHelper._math(function(num) {
            return num * 100;
        }, '%', n);

        return result;
    }
});

},{"../tree/anonymous":18,"../tree/dimension":23,"./function-registry":9,"./math-helper.js":11}],14:[function(require,module,exports){
var Quoted = require("../tree/quoted"),
    Anonymous = require("../tree/anonymous"),
    JavaScript = require("../tree/javascript"),
    functionRegistry = require("./function-registry");

functionRegistry.addMultiple({
    e: function (str) {
        return new Anonymous(str instanceof JavaScript ? str.evaluated : str.value);
    },
    escape: function (str) {
        return new Anonymous(
            encodeURI(str.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B")
                .replace(/\(/g, "%28").replace(/\)/g, "%29"));
    },
    replace: function (string, pattern, replacement, flags) {
        var result = string.value;
        replacement = (replacement.type === "Quoted") ?
            replacement.value : replacement.toCSS();
        result = result.replace(new RegExp(pattern.value, flags ? flags.value : ''), replacement);
        return new Quoted(string.quote || '', result, string.escaped);
    },
    '%': function (string /* arg, arg, ...*/) {
        var args = Array.prototype.slice.call(arguments, 1),
            result = string.value;

        for (var i = 0; i < args.length; i++) {
            /*jshint loopfunc:true */
            result = result.replace(/%[sda]/i, function(token) {
                var value = ((args[i].type === "Quoted") &&
                    token.match(/s/i)) ? args[i].value : args[i].toCSS();
                return token.match(/[A-Z]$/) ? encodeURIComponent(value) : value;
            });
        }
        result = result.replace(/%%/g, '%');
        return new Quoted(string.quote || '', result, string.escaped);
    }
});

},{"../tree/anonymous":18,"../tree/javascript":25,"../tree/quoted":31,"./function-registry":9}],15:[function(require,module,exports){
module.exports = function(environment) {
    var Dimension = require("../tree/dimension"),
        Color = require("../tree/color"),
        Expression = require("../tree/expression"),
        Quoted = require("../tree/quoted"),
        URL = require("../tree/url"),
        functionRegistry = require("./function-registry");

    functionRegistry.add("svg-gradient", function(direction) {

        var stops,
            gradientDirectionSvg,
            gradientType = "linear",
            rectangleDimension = 'x="0" y="0" width="1" height="1"',
            renderEnv = {compress: false},
            returner,
            directionValue = direction.toCSS(renderEnv),
			i, color, position, positionValue, alpha;

        function throwArgumentDescriptor() {
            throw { type: "Argument",
					message: "svg-gradient expects direction, start_color [start_position], [color position,]...," +
							" end_color [end_position] or direction, color list" };
        }

        if (arguments.length == 2) {
            if (arguments[1].value.length < 2) {
                throwArgumentDescriptor();
            }
            stops = arguments[1].value;
        } else if (arguments.length < 3) {
            throwArgumentDescriptor();
        } else {
            stops = Array.prototype.slice.call(arguments, 1);
        }

        switch (directionValue) {
            case "to bottom":
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="0%" y2="100%"';
                break;
            case "to right":
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="0%"';
                break;
            case "to bottom right":
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="100%"';
                break;
            case "to top right":
                gradientDirectionSvg = 'x1="0%" y1="100%" x2="100%" y2="0%"';
                break;
            case "ellipse":
            case "ellipse at center":
                gradientType = "radial";
                gradientDirectionSvg = 'cx="50%" cy="50%" r="75%"';
                rectangleDimension = 'x="-50" y="-50" width="101" height="101"';
                break;
            default:
                throw { type: "Argument", message: "svg-gradient direction must be 'to bottom', 'to right'," +
                    " 'to bottom right', 'to top right' or 'ellipse at center'" };
        }
        returner = '<?xml version="1.0" ?>' +
            '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">' +
            '<' + gradientType + 'Gradient id="gradient" gradientUnits="userSpaceOnUse" ' + gradientDirectionSvg + '>';

        for (i = 0; i < stops.length; i+= 1) {
            if (stops[i] instanceof Expression) {
                color = stops[i].value[0];
                position = stops[i].value[1];
            } else {
                color = stops[i];
                position = undefined;
            }

            if (!(color instanceof Color) || (!((i === 0 || i + 1 === stops.length) && position === undefined) && !(position instanceof Dimension))) {
                throwArgumentDescriptor();
            }
            positionValue = position ? position.toCSS(renderEnv) : i === 0 ? "0%" : "100%";
            alpha = color.alpha;
            returner += '<stop offset="' + positionValue + '" stop-color="' + color.toRGB() + '"' + (alpha < 1 ? ' stop-opacity="' + alpha + '"' : '') + '/>';
        }
        returner += '</' + gradientType + 'Gradient>' +
            '<rect ' + rectangleDimension + ' fill="url(#gradient)" /></svg>';

        returner = encodeURIComponent(returner);

        returner = "data:image/svg+xml," + returner;
        return new URL(new Quoted("'" + returner + "'", returner, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
    });
};

},{"../tree/color":19,"../tree/dimension":23,"../tree/expression":24,"../tree/quoted":31,"../tree/url":33,"./function-registry":9}],16:[function(require,module,exports){
var Keyword = require("../tree/keyword"),
    DetachedRuleset = require("../tree/detached-ruleset"),
    Dimension = require("../tree/dimension"),
    Color = require("../tree/color"),
    Quoted = require("../tree/quoted"),
    Anonymous = require("../tree/anonymous"),
    URL = require("../tree/url"),
    Operation = require("../tree/operation"),
    functionRegistry = require("./function-registry");

var isa = function (n, Type) {
        return (n instanceof Type) ? Keyword.True : Keyword.False;
    },
    isunit = function (n, unit) {
        if (unit === undefined) {
            throw { type: "Argument", message: "missing the required second argument to isunit." };
        }
        unit = typeof unit.value === "string" ? unit.value : unit;
        if (typeof unit !== "string") {
            throw { type: "Argument", message: "Second argument to isunit should be a unit or a string." };
        }
        return (n instanceof Dimension) && n.unit.is(unit) ? Keyword.True : Keyword.False;
    },
    getItemsFromNode = function(node) {
        // handle non-array values as an array of length 1
        // return 'undefined' if index is invalid
        var items = Array.isArray(node.value) ?
            node.value : Array(node);

        return items;
    };
functionRegistry.addMultiple({
    isruleset: function (n) {
        return isa(n, DetachedRuleset);
    },
    iscolor: function (n) {
        return isa(n, Color);
    },
    isnumber: function (n) {
        return isa(n, Dimension);
    },
    isstring: function (n) {
        return isa(n, Quoted);
    },
    iskeyword: function (n) {
        return isa(n, Keyword);
    },
    isurl: function (n) {
        return isa(n, URL);
    },
    ispixel: function (n) {
        return isunit(n, 'px');
    },
    ispercentage: function (n) {
        return isunit(n, '%');
    },
    isem: function (n) {
        return isunit(n, 'em');
    },
    isunit: isunit,
    unit: function (val, unit) {
        if (!(val instanceof Dimension)) {
            throw { type: "Argument",
                message: "the first argument to unit must be a number" +
                    (val instanceof Operation ? ". Have you forgotten parenthesis?" : "") };
        }
        if (unit) {
            if (unit instanceof Keyword) {
                unit = unit.value;
            } else {
                unit = unit.toCSS();
            }
        } else {
            unit = "";
        }
        return new Dimension(val.value, unit);
    },
    "get-unit": function (n) {
        return new Anonymous(n.unit);
    },
    extract: function(values, index) {
        index = index.value - 1; // (1-based index)

        return getItemsFromNode(values)[index];
    },
    length: function(values) {
        return new Dimension(getItemsFromNode(values).length);
    }
});

},{"../tree/anonymous":18,"../tree/color":19,"../tree/detached-ruleset":22,"../tree/dimension":23,"../tree/keyword":27,"../tree/operation":29,"../tree/quoted":31,"../tree/url":33,"./function-registry":9}],17:[function(require,module,exports){
module.exports = {
    error: function(msg) {
        this._fireEvent("error", msg);
    },
    warn: function(msg) {
        this._fireEvent("warn", msg);
    },
    info: function(msg) {
        this._fireEvent("info", msg);
    },
    debug: function(msg) {
        this._fireEvent("debug", msg);
    },
    addListener: function(listener) {
        this._listeners.push(listener);
    },
    removeListener: function(listener) {
        for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i] === listener) {
                this._listeners.splice(i, 1);
                return;
            }
        }
    },
    _fireEvent: function(type, msg) {
        for (var i = 0; i < this._listeners.length; i++) {
            var logFunction = this._listeners[i][type];
            if (logFunction) {
                logFunction(msg);
            }
        }
    },
    _listeners: []
};

},{}],18:[function(require,module,exports){
var Node = require("./node");

var Anonymous = function (value, index, currentFileInfo, mapLines, rulesetLike, visibilityInfo) {
    this.value = value;
    this.index = index;
    this.mapLines = mapLines;
    this.currentFileInfo = currentFileInfo;
    this.rulesetLike = (typeof rulesetLike === 'undefined') ? false : rulesetLike;
    this.allowRoot = true;
    this.copyVisibilityInfo(visibilityInfo);
};
Anonymous.prototype = new Node();
Anonymous.prototype.type = "Anonymous";
Anonymous.prototype.eval = function () {
    return new Anonymous(this.value, this.index, this.currentFileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
};
Anonymous.prototype.compare = function (other) {
    return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
};
Anonymous.prototype.isRulesetLike = function() {
    return this.rulesetLike;
};
Anonymous.prototype.genCSS = function (context, output) {
    output.add(this.value, this.currentFileInfo, this.index, this.mapLines);
};
module.exports = Anonymous;

},{"./node":28}],19:[function(require,module,exports){
var Node = require("./node"),
    colors = require("../data/colors");

//
// RGB Colors - #ff0014, #eee
//
var Color = function (rgb, a, originalForm) {
    //
    // The end goal here, is to parse the arguments
    // into an integer triplet, such as `128, 255, 0`
    //
    // This facilitates operations and conversions.
    //
    if (Array.isArray(rgb)) {
        this.rgb = rgb;
    } else if (rgb.length == 6) {
        this.rgb = rgb.match(/.{2}/g).map(function (c) {
            return parseInt(c, 16);
        });
    } else {
        this.rgb = rgb.split('').map(function (c) {
            return parseInt(c + c, 16);
        });
    }
    this.alpha = typeof a === 'number' ? a : 1;
    if (typeof originalForm !== 'undefined') {
        this.value = originalForm;
    }
};

Color.prototype = new Node();
Color.prototype.type = "Color";

function clamp(v, max) {
    return Math.min(Math.max(v, 0), max);
}

function toHex(v) {
    return '#' + v.map(function (c) {
        c = clamp(Math.round(c), 255);
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
}

Color.prototype.luma = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255;

    r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
    g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
    b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
Color.prototype.genCSS = function (context, output) {
    output.add(this.toCSS(context));
};
Color.prototype.toCSS = function (context, doNotCompress) {
    var compress = context && context.compress && !doNotCompress, color, alpha;

    // `value` is set if this color was originally
    // converted from a named color string so we need
    // to respect this and try to output named color too.
    if (this.value) {
        return this.value;
    }

    // If we have some transparency, the only way to represent it
    // is via `rgba`. Otherwise, we use the hex representation,
    // which has better compatibility with older browsers.
    // Values are capped between `0` and `255`, rounded and zero-padded.
    alpha = this.fround(context, this.alpha);
    if (alpha < 1) {
        return "rgba(" + this.rgb.map(function (c) {
            return clamp(Math.round(c), 255);
        }).concat(clamp(alpha, 1))
            .join(',' + (compress ? '' : ' ')) + ")";
    }

    color = this.toRGB();

    if (compress) {
        var splitcolor = color.split('');

        // Convert color to short format
        if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) {
            color = '#' + splitcolor[1] + splitcolor[3] + splitcolor[5];
        }
    }

    return color;
};

//
// Operations have to be done per-channel, if not,
// channels will spill onto each other. Once we have
// our result, in the form of an integer triplet,
// we create a new Color node to hold the result.
//
Color.prototype.operate = function (context, op, other) {
    var rgb = [];
    var alpha = this.alpha * (1 - other.alpha) + other.alpha;
    for (var c = 0; c < 3; c++) {
        rgb[c] = this._operate(context, op, this.rgb[c], other.rgb[c]);
    }
    return new Color(rgb, alpha);
};
Color.prototype.toRGB = function () {
    return toHex(this.rgb);
};
Color.prototype.toHSL = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2, d = max - min;

    if (max === min) {
        h = s = 0;
    } else {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2;               break;
            case b: h = (r - g) / d + 4;               break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l, a: a };
};
//Adapted from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
Color.prototype.toHSV = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    if (max === 0) {
        s = 0;
    } else {
        s = d / max;
    }

    if (max === min) {
        h = 0;
    } else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, v: v, a: a };
};
Color.prototype.toARGB = function () {
    return toHex([this.alpha * 255].concat(this.rgb));
};
Color.prototype.compare = function (x) {
    return (x.rgb &&
        x.rgb[0] === this.rgb[0] &&
        x.rgb[1] === this.rgb[1] &&
        x.rgb[2] === this.rgb[2] &&
        x.alpha  === this.alpha) ? 0 : undefined;
};

Color.fromKeyword = function(keyword) {
    var c, key = keyword.toLowerCase();
    if (colors.hasOwnProperty(key)) {
        c = new Color(colors[key].slice(1));
    }
    else if (key === "transparent") {
        c = new Color([0, 0, 0], 0);
    }

    if (c) {
        c.value = keyword;
        return c;
    }
};
module.exports = Color;

},{"../data/colors":2,"./node":28}],20:[function(require,module,exports){
var Node = require("./node"),
    getDebugInfo = require("./debug-info");

var Comment = function (value, isLineComment, index, currentFileInfo) {
    this.value = value;
    this.isLineComment = isLineComment;
    this.currentFileInfo = currentFileInfo;
    this.allowRoot = true;
};
Comment.prototype = new Node();
Comment.prototype.type = "Comment";
Comment.prototype.genCSS = function (context, output) {
    if (this.debugInfo) {
        output.add(getDebugInfo(context, this), this.currentFileInfo, this.index);
    }
    output.add(this.value);
};
Comment.prototype.isSilent = function(context) {
    var isCompressed = context.compress && this.value[2] !== "!";
    return this.isLineComment || isCompressed;
};
module.exports = Comment;

},{"./debug-info":21,"./node":28}],21:[function(require,module,exports){
var debugInfo = function(context, ctx, lineSeparator) {
    var result = "";
    if (context.dumpLineNumbers && !context.compress) {
        switch(context.dumpLineNumbers) {
            case 'comments':
                result = debugInfo.asComment(ctx);
                break;
            case 'mediaquery':
                result = debugInfo.asMediaQuery(ctx);
                break;
            case 'all':
                result = debugInfo.asComment(ctx) + (lineSeparator || "") + debugInfo.asMediaQuery(ctx);
                break;
        }
    }
    return result;
};

debugInfo.asComment = function(ctx) {
    return '/* line ' + ctx.debugInfo.lineNumber + ', ' + ctx.debugInfo.fileName + ' */\n';
};

debugInfo.asMediaQuery = function(ctx) {
    var filenameWithProtocol = ctx.debugInfo.fileName;
    if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
        filenameWithProtocol = 'file://' + filenameWithProtocol;
    }
    return '@media -sass-debug-info{filename{font-family:' +
        filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
            if (a == '\\') {
                a = '\/';
            }
            return '\\' + a;
        }) +
        '}line{font-family:\\00003' + ctx.debugInfo.lineNumber + '}}\n';
};

module.exports = debugInfo;

},{}],22:[function(require,module,exports){
var Node = require("./node"),
    contexts = require("../contexts");

var DetachedRuleset = function (ruleset, frames) {
    this.ruleset = ruleset;
    this.frames = frames;
};
DetachedRuleset.prototype = new Node();
DetachedRuleset.prototype.type = "DetachedRuleset";
DetachedRuleset.prototype.evalFirst = true;
DetachedRuleset.prototype.accept = function (visitor) {
    this.ruleset = visitor.visit(this.ruleset);
};
DetachedRuleset.prototype.eval = function (context) {
    var frames = this.frames || context.frames.slice(0);
    return new DetachedRuleset(this.ruleset, frames);
};
DetachedRuleset.prototype.callEval = function (context) {
    return this.ruleset.eval(this.frames ? new contexts.Eval(context, this.frames.concat(context.frames)) : context);
};
module.exports = DetachedRuleset;

},{"../contexts":1,"./node":28}],23:[function(require,module,exports){
var Node = require("./node"),
    unitConversions = require("../data/unit-conversions"),
    Unit = require("./unit"),
    Color = require("./color");

//
// A number with a unit
//
var Dimension = function (value, unit) {
    this.value = parseFloat(value);
    this.unit = (unit && unit instanceof Unit) ? unit :
      new Unit(unit ? [unit] : undefined);
};

Dimension.prototype = new Node();
Dimension.prototype.type = "Dimension";
Dimension.prototype.accept = function (visitor) {
    this.unit = visitor.visit(this.unit);
};
Dimension.prototype.eval = function (context) {
    return this;
};
Dimension.prototype.toColor = function () {
    return new Color([this.value, this.value, this.value]);
};
Dimension.prototype.genCSS = function (context, output) {
    if ((context && context.strictUnits) && !this.unit.isSingular()) {
        throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
    }

    var value = this.fround(context, this.value),
        strValue = String(value);

    if (value !== 0 && value < 0.000001 && value > -0.000001) {
        // would be output 1e-6 etc.
        strValue = value.toFixed(20).replace(/0+$/, "");
    }

    if (context && context.compress) {
        // Zero values doesn't need a unit
        if (value === 0 && this.unit.isLength()) {
            output.add(strValue);
            return;
        }

        // Float values doesn't need a leading zero
        if (value > 0 && value < 1) {
            strValue = (strValue).substr(1);
        }
    }

    output.add(strValue);
    this.unit.genCSS(context, output);
};

// In an operation between two Dimensions,
// we default to the first Dimension's unit,
// so `1px + 2` will yield `3px`.
Dimension.prototype.operate = function (context, op, other) {
    /*jshint noempty:false */
    var value = this._operate(context, op, this.value, other.value),
        unit = this.unit.clone();

    if (op === '+' || op === '-') {
        if (unit.numerator.length === 0 && unit.denominator.length === 0) {
            unit = other.unit.clone();
            if (this.unit.backupUnit) {
                unit.backupUnit = this.unit.backupUnit;
            }
        } else if (other.unit.numerator.length === 0 && unit.denominator.length === 0) {
            // do nothing
        } else {
            other = other.convertTo(this.unit.usedUnits());

            if (context.strictUnits && other.unit.toString() !== unit.toString()) {
                throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + unit.toString() +
                    "' and '" + other.unit.toString() + "'.");
            }

            value = this._operate(context, op, this.value, other.value);
        }
    } else if (op === '*') {
        unit.numerator = unit.numerator.concat(other.unit.numerator).sort();
        unit.denominator = unit.denominator.concat(other.unit.denominator).sort();
        unit.cancel();
    } else if (op === '/') {
        unit.numerator = unit.numerator.concat(other.unit.denominator).sort();
        unit.denominator = unit.denominator.concat(other.unit.numerator).sort();
        unit.cancel();
    }
    return new Dimension(value, unit);
};
Dimension.prototype.compare = function (other) {
    var a, b;

    if (!(other instanceof Dimension)) {
        return undefined;
    }

    if (this.unit.isEmpty() || other.unit.isEmpty()) {
        a = this;
        b = other;
    } else {
        a = this.unify();
        b = other.unify();
        if (a.unit.compare(b.unit) !== 0) {
            return undefined;
        }
    }

    return Node.numericCompare(a.value, b.value);
};
Dimension.prototype.unify = function () {
    return this.convertTo({ length: 'px', duration: 's', angle: 'rad' });
};
Dimension.prototype.convertTo = function (conversions) {
    var value = this.value, unit = this.unit.clone(),
        i, groupName, group, targetUnit, derivedConversions = {}, applyUnit;

    if (typeof conversions === 'string') {
        for (i in unitConversions) {
            if (unitConversions[i].hasOwnProperty(conversions)) {
                derivedConversions = {};
                derivedConversions[i] = conversions;
            }
        }
        conversions = derivedConversions;
    }
    applyUnit = function (atomicUnit, denominator) {
        /* jshint loopfunc:true */
        if (group.hasOwnProperty(atomicUnit)) {
            if (denominator) {
                value = value / (group[atomicUnit] / group[targetUnit]);
            } else {
                value = value * (group[atomicUnit] / group[targetUnit]);
            }

            return targetUnit;
        }

        return atomicUnit;
    };

    for (groupName in conversions) {
        if (conversions.hasOwnProperty(groupName)) {
            targetUnit = conversions[groupName];
            group = unitConversions[groupName];

            unit.map(applyUnit);
        }
    }

    unit.cancel();

    return new Dimension(value, unit);
};
module.exports = Dimension;

},{"../data/unit-conversions":3,"./color":19,"./node":28,"./unit":32}],24:[function(require,module,exports){
var Node = require("./node"),
    Paren = require("./paren"),
    Comment = require("./comment");

var Expression = function (value) {
    this.value = value;
    if (!value) {
        throw new Error("Expression requires an array parameter");
    }
};
Expression.prototype = new Node();
Expression.prototype.type = "Expression";
Expression.prototype.accept = function (visitor) {
    this.value = visitor.visitArray(this.value);
};
Expression.prototype.eval = function (context) {
    var returnValue,
        inParenthesis = this.parens && !this.parensInOp,
        doubleParen = false;
    if (inParenthesis) {
        context.inParenthesis();
    }
    if (this.value.length > 1) {
        returnValue = new Expression(this.value.map(function (e) {
            return e.eval(context);
        }));
    } else if (this.value.length === 1) {
        if (this.value[0].parens && !this.value[0].parensInOp) {
            doubleParen = true;
        }
        returnValue = this.value[0].eval(context);
    } else {
        returnValue = this;
    }
    if (inParenthesis) {
        context.outOfParenthesis();
    }
    if (this.parens && this.parensInOp && !(context.isMathOn()) && !doubleParen) {
        returnValue = new Paren(returnValue);
    }
    return returnValue;
};
Expression.prototype.genCSS = function (context, output) {
    for (var i = 0; i < this.value.length; i++) {
        this.value[i].genCSS(context, output);
        if (i + 1 < this.value.length) {
            output.add(" ");
        }
    }
};
Expression.prototype.throwAwayComments = function () {
    this.value = this.value.filter(function(v) {
        return !(v instanceof Comment);
    });
};
module.exports = Expression;

},{"./comment":20,"./node":28,"./paren":30}],25:[function(require,module,exports){
var JsEvalNode = require("./js-eval-node"),
    Dimension = require("./dimension"),
    Quoted = require("./quoted"),
    Anonymous = require("./anonymous");

var JavaScript = function (string, escaped, index, currentFileInfo) {
    this.escaped = escaped;
    this.expression = string;
    this.index = index;
    this.currentFileInfo = currentFileInfo;
};
JavaScript.prototype = new JsEvalNode();
JavaScript.prototype.type = "JavaScript";
JavaScript.prototype.eval = function(context) {
    var result = this.evaluateJavaScript(this.expression, context);

    if (typeof result === 'number') {
        return new Dimension(result);
    } else if (typeof result === 'string') {
        return new Quoted('"' + result + '"', result, this.escaped, this.index);
    } else if (Array.isArray(result)) {
        return new Anonymous(result.join(', '));
    } else {
        return new Anonymous(result);
    }
};

module.exports = JavaScript;

},{"./anonymous":18,"./dimension":23,"./js-eval-node":26,"./quoted":31}],26:[function(require,module,exports){
var Node = require("./node"),
    Variable = require("./variable");

var JsEvalNode = function() {
};
JsEvalNode.prototype = new Node();

JsEvalNode.prototype.evaluateJavaScript = function (expression, context) {
    var result,
        that = this,
        evalContext = {};

    if (context.javascriptEnabled !== undefined && !context.javascriptEnabled) {
        throw { message: "You are using JavaScript, which has been disabled.",
            filename: this.currentFileInfo.filename,
            index: this.index };
    }

    expression = expression.replace(/@\{([\w-]+)\}/g, function (_, name) {
        return that.jsify(new Variable('@' + name, that.index, that.currentFileInfo).eval(context));
    });

    try {
        expression = new Function('return (' + expression + ')');
    } catch (e) {
        throw { message: "JavaScript evaluation error: " + e.message + " from `" + expression + "`" ,
            filename: this.currentFileInfo.filename,
            index: this.index };
    }

    var variables = context.frames[0].variables();
    for (var k in variables) {
        if (variables.hasOwnProperty(k)) {
            /*jshint loopfunc:true */
            evalContext[k.slice(1)] = {
                value: variables[k].value,
                toJS: function () {
                    return this.value.eval(context).toCSS();
                }
            };
        }
    }

    try {
        result = expression.call(evalContext);
    } catch (e) {
        throw { message: "JavaScript evaluation error: '" + e.name + ': ' + e.message.replace(/["]/g, "'") + "'" ,
            filename: this.currentFileInfo.filename,
            index: this.index };
    }
    return result;
};
JsEvalNode.prototype.jsify = function (obj) {
    if (Array.isArray(obj.value) && (obj.value.length > 1)) {
        return '[' + obj.value.map(function (v) { return v.toCSS(); }).join(', ') + ']';
    } else {
        return obj.toCSS();
    }
};

module.exports = JsEvalNode;

},{"./node":28,"./variable":34}],27:[function(require,module,exports){
var Node = require("./node");

var Keyword = function (value) { this.value = value; };
Keyword.prototype = new Node();
Keyword.prototype.type = "Keyword";
Keyword.prototype.genCSS = function (context, output) {
    if (this.value === '%') { throw { type: "Syntax", message: "Invalid % without number" }; }
    output.add(this.value);
};

Keyword.True = new Keyword('true');
Keyword.False = new Keyword('false');

module.exports = Keyword;

},{"./node":28}],28:[function(require,module,exports){
var Node = function() {
};
Node.prototype.toCSS = function (context) {
    var strs = [];
    this.genCSS(context, {
        add: function(chunk, fileInfo, index) {
            strs.push(chunk);
        },
        isEmpty: function () {
            return strs.length === 0;
        }
    });
    return strs.join('');
};
Node.prototype.genCSS = function (context, output) {
    output.add(this.value);
};
Node.prototype.accept = function (visitor) {
    this.value = visitor.visit(this.value);
};
Node.prototype.eval = function () { return this; };
Node.prototype._operate = function (context, op, a, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
};
Node.prototype.fround = function(context, value) {
    var precision = context && context.numPrecision;
    //add "epsilon" to ensure numbers like 1.000000005 (represented as 1.000000004999....) are properly rounded...
    return (precision == null) ? value : Number((value + 2e-16).toFixed(precision));
};
Node.compare = function (a, b) {
    /* returns:
     -1: a < b
     0: a = b
     1: a > b
     and *any* other value for a != b (e.g. undefined, NaN, -2 etc.) */

    if ((a.compare) &&
        // for "symmetric results" force toCSS-based comparison
        // of Quoted or Anonymous if either value is one of those
        !(b.type === "Quoted" || b.type === "Anonymous")) {
        return a.compare(b);
    } else if (b.compare) {
        return -b.compare(a);
    } else if (a.type !== b.type) {
        return undefined;
    }

    a = a.value;
    b = b.value;
    if (!Array.isArray(a)) {
        return a === b ? 0 : undefined;
    }
    if (a.length !== b.length) {
        return undefined;
    }
    for (var i = 0; i < a.length; i++) {
        if (Node.compare(a[i], b[i]) !== 0) {
            return undefined;
        }
    }
    return 0;
};

Node.numericCompare = function (a, b) {
    return a  <  b ? -1
        : a === b ?  0
        : a  >  b ?  1 : undefined;
};
// Returns true if this node represents root of ast imported by reference
Node.prototype.blocksVisibility = function () {
    if (this.visibilityBlocks == null) {
        this.visibilityBlocks = 0;
    }
    return this.visibilityBlocks !== 0;
};
Node.prototype.addVisibilityBlock = function () {
    if (this.visibilityBlocks == null) {
        this.visibilityBlocks = 0;
    }
    this.visibilityBlocks = this.visibilityBlocks + 1;
};
Node.prototype.removeVisibilityBlock = function () {
    if (this.visibilityBlocks == null) {
        this.visibilityBlocks = 0;
    }
    this.visibilityBlocks = this.visibilityBlocks - 1;
};
//Turns on node visibility - if called node will be shown in output regardless
//of whether it comes from import by reference or not
Node.prototype.ensureVisibility = function () {
    this.nodeVisible = true;
};
//Turns off node visibility - if called node will NOT be shown in output regardless
//of whether it comes from import by reference or not
Node.prototype.ensureInvisibility = function () {
    this.nodeVisible = false;
};
// return values:
// false - the node must not be visible
// true - the node must be visible
// undefined or null - the node has the same visibility as its parent
Node.prototype.isVisible = function () {
    return this.nodeVisible;
};
Node.prototype.visibilityInfo = function() {
    return {
        visibilityBlocks: this.visibilityBlocks,
        nodeVisible: this.nodeVisible
    };
};
Node.prototype.copyVisibilityInfo = function(info) {
    if (!info) {
        return;
    }
    this.visibilityBlocks = info.visibilityBlocks;
    this.nodeVisible = info.nodeVisible;
};
module.exports = Node;

},{}],29:[function(require,module,exports){
var Node = require("./node"),
    Color = require("./color"),
    Dimension = require("./dimension");

var Operation = function (op, operands, isSpaced) {
    this.op = op.trim();
    this.operands = operands;
    this.isSpaced = isSpaced;
};
Operation.prototype = new Node();
Operation.prototype.type = "Operation";
Operation.prototype.accept = function (visitor) {
    this.operands = visitor.visit(this.operands);
};
Operation.prototype.eval = function (context) {
    var a = this.operands[0].eval(context),
        b = this.operands[1].eval(context);

    if (context.isMathOn()) {
        if (a instanceof Dimension && b instanceof Color) {
            a = a.toColor();
        }
        if (b instanceof Dimension && a instanceof Color) {
            b = b.toColor();
        }
        if (!a.operate) {
            throw { type: "Operation",
                    message: "Operation on an invalid type" };
        }

        return a.operate(context, this.op, b);
    } else {
        return new Operation(this.op, [a, b], this.isSpaced);
    }
};
Operation.prototype.genCSS = function (context, output) {
    this.operands[0].genCSS(context, output);
    if (this.isSpaced) {
        output.add(" ");
    }
    output.add(this.op);
    if (this.isSpaced) {
        output.add(" ");
    }
    this.operands[1].genCSS(context, output);
};

module.exports = Operation;

},{"./color":19,"./dimension":23,"./node":28}],30:[function(require,module,exports){
var Node = require("./node");

var Paren = function (node) {
    this.value = node;
};
Paren.prototype = new Node();
Paren.prototype.type = "Paren";
Paren.prototype.genCSS = function (context, output) {
    output.add('(');
    this.value.genCSS(context, output);
    output.add(')');
};
Paren.prototype.eval = function (context) {
    return new Paren(this.value.eval(context));
};
module.exports = Paren;

},{"./node":28}],31:[function(require,module,exports){
var Node = require("./node"),
    JsEvalNode = require("./js-eval-node"),
    Variable = require("./variable");

var Quoted = function (str, content, escaped, index, currentFileInfo) {
    this.escaped = (escaped == null) ? true : escaped;
    this.value = content || '';
    this.quote = str.charAt(0);
    this.index = index;
    this.currentFileInfo = currentFileInfo;
};
Quoted.prototype = new JsEvalNode();
Quoted.prototype.type = "Quoted";
Quoted.prototype.genCSS = function (context, output) {
    if (!this.escaped) {
        output.add(this.quote, this.currentFileInfo, this.index);
    }
    output.add(this.value);
    if (!this.escaped) {
        output.add(this.quote);
    }
};
Quoted.prototype.containsVariables = function() {
    return this.value.match(/(`([^`]+)`)|@\{([\w-]+)\}/);
};
Quoted.prototype.eval = function (context) {
    var that = this, value = this.value;
    var javascriptReplacement = function (_, exp) {
        return String(that.evaluateJavaScript(exp, context));
    };
    var interpolationReplacement = function (_, name) {
        var v = new Variable('@' + name, that.index, that.currentFileInfo).eval(context, true);
        return (v instanceof Quoted) ? v.value : v.toCSS();
    };
    function iterativeReplace(value, regexp, replacementFnc) {
        var evaluatedValue = value;
        do {
            value = evaluatedValue;
            evaluatedValue = value.replace(regexp, replacementFnc);
        } while (value !== evaluatedValue);
        return evaluatedValue;
    }
    value = iterativeReplace(value, /`([^`]+)`/g, javascriptReplacement);
    value = iterativeReplace(value, /@\{([\w-]+)\}/g, interpolationReplacement);
    return new Quoted(this.quote + value + this.quote, value, this.escaped, this.index, this.currentFileInfo);
};
Quoted.prototype.compare = function (other) {
    // when comparing quoted strings allow the quote to differ
    if (other.type === "Quoted" && !this.escaped && !other.escaped) {
        return Node.numericCompare(this.value, other.value);
    } else {
        return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
    }
};
module.exports = Quoted;

},{"./js-eval-node":26,"./node":28,"./variable":34}],32:[function(require,module,exports){
var Node = require("./node"),
    unitConversions = require("../data/unit-conversions");

var Unit = function (numerator, denominator, backupUnit) {
    this.numerator = numerator ? numerator.slice(0).sort() : [];
    this.denominator = denominator ? denominator.slice(0).sort() : [];
    if (backupUnit) {
        this.backupUnit = backupUnit;
    } else if (numerator && numerator.length) {
        this.backupUnit = numerator[0];
    }
};

Unit.prototype = new Node();
Unit.prototype.type = "Unit";
Unit.prototype.clone = function () {
    return new Unit(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit);
};
Unit.prototype.genCSS = function (context, output) {
    // Dimension checks the unit is singular and throws an error if in strict math mode.
    var strictUnits = context && context.strictUnits;
    if (this.numerator.length === 1) {
        output.add(this.numerator[0]); // the ideal situation
    } else if (!strictUnits && this.backupUnit) {
        output.add(this.backupUnit);
    } else if (!strictUnits && this.denominator.length) {
        output.add(this.denominator[0]);
    }
};
Unit.prototype.toString = function () {
    var i, returnStr = this.numerator.join("*");
    for (i = 0; i < this.denominator.length; i++) {
        returnStr += "/" + this.denominator[i];
    }
    return returnStr;
};
Unit.prototype.compare = function (other) {
    return this.is(other.toString()) ? 0 : undefined;
};
Unit.prototype.is = function (unitString) {
    return this.toString().toUpperCase() === unitString.toUpperCase();
};
Unit.prototype.isLength = function () {
    return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/));
};
Unit.prototype.isEmpty = function () {
    return this.numerator.length === 0 && this.denominator.length === 0;
};
Unit.prototype.isSingular = function() {
    return this.numerator.length <= 1 && this.denominator.length === 0;
};
Unit.prototype.map = function(callback) {
    var i;

    for (i = 0; i < this.numerator.length; i++) {
        this.numerator[i] = callback(this.numerator[i], false);
    }

    for (i = 0; i < this.denominator.length; i++) {
        this.denominator[i] = callback(this.denominator[i], true);
    }
};
Unit.prototype.usedUnits = function() {
    var group, result = {}, mapUnit, groupName;

    mapUnit = function (atomicUnit) {
        /*jshint loopfunc:true */
        if (group.hasOwnProperty(atomicUnit) && !result[groupName]) {
            result[groupName] = atomicUnit;
        }

        return atomicUnit;
    };

    for (groupName in unitConversions) {
        if (unitConversions.hasOwnProperty(groupName)) {
            group = unitConversions[groupName];

            this.map(mapUnit);
        }
    }

    return result;
};
Unit.prototype.cancel = function () {
    var counter = {}, atomicUnit, i;

    for (i = 0; i < this.numerator.length; i++) {
        atomicUnit = this.numerator[i];
        counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
    }

    for (i = 0; i < this.denominator.length; i++) {
        atomicUnit = this.denominator[i];
        counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
    }

    this.numerator = [];
    this.denominator = [];

    for (atomicUnit in counter) {
        if (counter.hasOwnProperty(atomicUnit)) {
            var count = counter[atomicUnit];

            if (count > 0) {
                for (i = 0; i < count; i++) {
                    this.numerator.push(atomicUnit);
                }
            } else if (count < 0) {
                for (i = 0; i < -count; i++) {
                    this.denominator.push(atomicUnit);
                }
            }
        }
    }

    this.numerator.sort();
    this.denominator.sort();
};
module.exports = Unit;

},{"../data/unit-conversions":3,"./node":28}],33:[function(require,module,exports){
var Node = require("./node");

var URL = function (val, index, currentFileInfo, isEvald) {
    this.value = val;
    this.currentFileInfo = currentFileInfo;
    this.index = index;
    this.isEvald = isEvald;
};
URL.prototype = new Node();
URL.prototype.type = "Url";
URL.prototype.accept = function (visitor) {
    this.value = visitor.visit(this.value);
};
URL.prototype.genCSS = function (context, output) {
    output.add("url(");
    this.value.genCSS(context, output);
    output.add(")");
};
URL.prototype.eval = function (context) {
    var val = this.value.eval(context),
        rootpath;

    if (!this.isEvald) {
        // Add the base path if the URL is relative
        rootpath = this.currentFileInfo && this.currentFileInfo.rootpath;
        if (rootpath &&
            typeof val.value === "string" &&
            context.isPathRelative(val.value)) {

            if (!val.quote) {
                rootpath = rootpath.replace(/[\(\)'"\s]/g, function(match) { return "\\" + match; });
            }
            val.value = rootpath + val.value;
        }

        val.value = context.normalizePath(val.value);

        // Add url args if enabled
        if (context.urlArgs) {
            if (!val.value.match(/^\s*data:/)) {
                var delimiter = val.value.indexOf('?') === -1 ? '?' : '&';
                var urlArgs = delimiter + context.urlArgs;
                if (val.value.indexOf('#') !== -1) {
                    val.value = val.value.replace('#', urlArgs + '#');
                } else {
                    val.value += urlArgs;
                }
            }
        }
    }

    return new URL(val, this.index, this.currentFileInfo, true);
};
module.exports = URL;

},{"./node":28}],34:[function(require,module,exports){
var Node = require("./node");

var Variable = function (name, index, currentFileInfo) {
    this.name = name;
    this.index = index;
    this.currentFileInfo = currentFileInfo || {};
};
Variable.prototype = new Node();
Variable.prototype.type = "Variable";
Variable.prototype.eval = function (context) {
    var variable, name = this.name;

    if (name.indexOf('@@') === 0) {
        name = '@' + new Variable(name.slice(1), this.index, this.currentFileInfo).eval(context).value;
    }

    if (this.evaluating) {
        throw { type: 'Name',
                message: "Recursive variable definition for " + name,
                filename: this.currentFileInfo.filename,
                index: this.index };
    }

    this.evaluating = true;

    variable = this.find(context.frames, function (frame) {
        var v = frame.variable(name);
        if (v) {
            if (v.important) {
                var importantScope = context.importantScope[context.importantScope.length - 1];
                importantScope.important = v.important;
            }
            return v.value.eval(context);
        }
    });
    if (variable) {
        this.evaluating = false;
        return variable;
    } else {
        throw { type: 'Name',
                message: "variable " + name + " is undefined",
                filename: this.currentFileInfo.filename,
                index: this.index };
    }
};
Variable.prototype.find = function (obj, fun) {
    for (var i = 0, r; i < obj.length; i++) {
        r = fun.call(obj, obj[i]);
        if (r) { return r; }
    }
    return null;
};
module.exports = Variable;

},{"./node":28}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// better type check
var is = function (t, v) { return {}.toString.call(v).slice(8, -1) === t }
var own = function (o, k) { return {}.hasOwnProperty.call(o, k) }

function isIterable (v) {
  return is('Object', v) || is('Array', v) || is('Map', v)
}

function isPrimitive (val) {
  return !/obj|func/.test(typeof val) || !val
}

function deepIt (a, b, callback, path) {
  path = path || []
  if (isPrimitive(b)) return a
  for ( var key in b) {
    if (!own(b, key)) continue
    callback(a, b, key, path, key in a)
    if (isIterable(b[key]) && isIterable(a[key])) {
      deepIt(a[key], b[key], callback, path.concat(key))
    }
  }
  return a
}

function get(obj, p, errNotFound) {
  var n = obj
  for(var i = 0, len = p.length; i < len; i++) {
    if(!isIterable(n) || !(p[i] in n))
      return errNotFound ? new Error('NotFound') : undefined
    n = n[p[i]]
  }
  return n
}

function extend () {
  var arg = arguments, last
  for(var i=arg.length; i--;) {
    last = deepIt(arg[i], last, function (a, b, key, path, inA) {
      if(!inA || isPrimitive(b[key])) a[key] = b[key]
    })
  }
  return last
}

/** Usage: _exlucde(obj, {x:{y:2, z:3} } ) will delete x.y,x.z on obj
 *  when isSet, will set value to a instead of delete
 */
// _exclude( {a:1,b:{d:{ c:2} } }, { b:{d:{ c:1} } } )
function exclude (x, y, isSet) {
  return deepIt(x, y, function (a, b, key) {
    if (isPrimitive(b[key])) {
      isSet
        ? (key in a ? a[key] = b[key] : '')
      : (b[key] ? delete a[key] : '')
    }
  })
}

function pick(obj, props) {
  var o={}
  return deepIt(o, props, function(a,b,key,path){
    var c = get(obj,path.concat(key))
    if(!b[key]) return
    if(!isPrimitive(c)) a[key] = is('Array', c) ? [] : {}
    if(isPrimitive(b[key])) a[key] = c
  })
}

function pick2(obj, props) {
  props=props||{}
  var o={}
  return deepIt(o, obj, function(a,b,key,path){
    var c = get(props,path.concat(key))
    if(c && isPrimitive(c)) return
    if(!isPrimitive(b[key])) a[key] = is('Array', b[key]) ? [] : {}
    else a[key]= b[key]
  })
}

function defaults(obj, option) {
  return deepIt(obj, option, function(a,b,key){
    if(!(key in a)) a[key]=b[key]
  })
}

exports.is = is;
exports.own = own;
exports.isIterable = isIterable;
exports.isPrimitive = isPrimitive;
exports.deepIt = deepIt;
exports.get = get;
exports.extend = extend;
exports.exclude = exclude;
exports.pick = pick;
exports.pick2 = pick2;
exports.defaults = defaults;
},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
// all bootstrap vars

module.exports = {
  'gray-base': '#000',
  'gray-darker': 'lighten(@gray-base, 13.5%)',
  'gray-dark': 'lighten(@gray-base, 20%)',
  'gray': 'lighten(@gray-base, 33.5%)',
  'gray-light': 'lighten(@gray-base, 46.7%)',
  'gray-lighter': 'lighten(@gray-base, 93.5%)',
  'brand-primary': 'darken(#428bca, 6.5%)',
  'brand-success': '#5cb85c',
  'brand-info': '#5bc0de',
  'brand-warning': '#f0ad4e',
  'brand-danger': '#d9534f',
  'body-bg': '#fff',
  'text-color': '@gray-dark',
  'link-color': '@brand-primary',
  'link-hover-color': 'darken(@link-color, 15%)',
  'link-hover-decoration': 'underline',
  'font-family-sans-serif': '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'font-family-serif': 'Georgia, "Times New Roman", Times, serif',
  'font-family-monospace': 'Menlo, Monaco, Consolas, "Courier New", monospace',
  'font-family-base': '@font-family-sans-serif',
  'font-size-base': '14px',
  'font-size-large': 'ceil((@font-size-base * 1.25))',
  'font-size-small': 'ceil((@font-size-base * 0.85))',
  'font-size-h1': 'floor((@font-size-base * 2.6))',
  'font-size-h2': 'floor((@font-size-base * 2.15))',
  'font-size-h3': 'ceil((@font-size-base * 1.7))',
  'font-size-h4': 'ceil((@font-size-base * 1.25))',
  'font-size-h5': '@font-size-base',
  'font-size-h6': 'ceil((@font-size-base * 0.85))',
  'line-height-base': 1.428571429,
  'line-height-computed': 'floor((@font-size-base * @line-height-base))',
  'headings-font-family': 'inherit',
  'headings-font-weight': 500,
  'headings-line-height': 1.1,
  'headings-color': 'inherit',
  'icon-font-path': '"../fonts/"',
  'icon-font-name': '"glyphicons-halflings-regular"',
  'icon-font-svg-id': '"glyphicons_halflingsregular"',
  'padding-base-vertical': '6px',
  'padding-base-horizontal': '12px',
  'padding-large-vertical': '10px',
  'padding-large-horizontal': '16px',
  'padding-small-vertical': '5px',
  'padding-small-horizontal': '10px',
  'padding-xs-vertical': '1px',
  'padding-xs-horizontal': '5px',
  'line-height-large': 1.3333333,
  'line-height-small': 1.5,
  'border-radius-base': '4px',
  'border-radius-large': '6px',
  'border-radius-small': '3px',
  'component-active-color': '#fff',
  'component-active-bg': '@brand-primary',
  'caret-width-base': '4px',
  'caret-width-large': '5px',
  'table-cell-padding': '8px',
  'table-condensed-cell-padding': '5px',
  'table-bg': 'transparent',
  'table-bg-accent': '#f9f9f9',
  'table-bg-hover': '#f5f5f5',
  'table-bg-active': '@table-bg-hover',
  'table-border-color': '#ddd',
  'btn-font-weight': 'normal',
  'btn-default-color': '#333',
  'btn-default-bg': '#fff',
  'btn-default-border': '#ccc',
  'btn-primary-color': '#fff',
  'btn-primary-bg': '@brand-primary',
  'btn-primary-border': 'darken(@btn-primary-bg, 5%)',
  'btn-success-color': '#fff',
  'btn-success-bg': '@brand-success',
  'btn-success-border': 'darken(@btn-success-bg, 5%)',
  'btn-info-color': '#fff',
  'btn-info-bg': '@brand-info',
  'btn-info-border': 'darken(@btn-info-bg, 5%)',
  'btn-warning-color': '#fff',
  'btn-warning-bg': '@brand-warning',
  'btn-warning-border': 'darken(@btn-warning-bg, 5%)',
  'btn-danger-color': '#fff',
  'btn-danger-bg': '@brand-danger',
  'btn-danger-border': 'darken(@btn-danger-bg, 5%)',
  'btn-link-disabled-color': '@gray-light',
  'btn-border-radius-base': '@border-radius-base',
  'btn-border-radius-large': '@border-radius-large',
  'btn-border-radius-small': '@border-radius-small',
  'input-bg': '#fff',
  'input-bg-disabled': '@gray-lighter',
  'input-color': '@gray',
  'input-border': '#ccc',
  'input-border-radius': '@border-radius-base',
  'input-border-radius-large': '@border-radius-large',
  'input-border-radius-small': '@border-radius-small',
  'input-border-focus': '#66afe9',
  'input-color-placeholder': '#999',
  'input-height-base': '(@line-height-computed + (@padding-base-vertical * 2) + 2)',
  'input-height-large': '(ceil(@font-size-large * @line-height-large) + (@padding-large-vertical * 2) + 2)',
  'input-height-small': '(floor(@font-size-small * @line-height-small) + (@padding-small-vertical * 2) + 2)',
  'form-group-margin-bottom': '15px',
  'legend-color': '@gray-dark',
  'legend-border-color': '#e5e5e5',
  'input-group-addon-bg': '@gray-lighter',
  'input-group-addon-border-color': '@input-border',
  'cursor-disabled': 'not-allowed',
  'dropdown-bg': '#fff',
  'dropdown-border': 'rgba(0,0,0,.15)',
  'dropdown-fallback-border': '#ccc',
  'dropdown-divider-bg': '#e5e5e5',
  'dropdown-link-color': '@gray-dark',
  'dropdown-link-hover-color': 'darken(@gray-dark, 5%)',
  'dropdown-link-hover-bg': '#f5f5f5',
  'dropdown-link-active-color': '@component-active-color',
  'dropdown-link-active-bg': '@component-active-bg',
  'dropdown-link-disabled-color': '@gray-light',
  'dropdown-header-color': '@gray-light',
  'dropdown-caret-color': '#000',
  'zindex-navbar': 1000,
  'zindex-dropdown': 1000,
  'zindex-popover': 1060,
  'zindex-tooltip': 1070,
  'zindex-navbar-fixed': 1030,
  'zindex-modal-background': 1040,
  'zindex-modal': 1050,
  'screen-xs': '480px',
  'screen-xs-min': '@screen-xs',
  'screen-phone': '@screen-xs-min',
  'screen-sm': '768px',
  'screen-sm-min': '@screen-sm',
  'screen-tablet': '@screen-sm-min',
  'screen-md': '992px',
  'screen-md-min': '@screen-md',
  'screen-desktop': '@screen-md-min',
  'screen-lg': '1200px',
  'screen-lg-min': '@screen-lg',
  'screen-lg-desktop': '@screen-lg-min',
  'screen-xs-max': '(@screen-sm-min - 1)',
  'screen-sm-max': '(@screen-md-min - 1)',
  'screen-md-max': '(@screen-lg-min - 1)',
  'grid-columns': 12,
  'grid-gutter-width': '30px',
  'grid-float-breakpoint': '@screen-sm-min',
  'grid-float-breakpoint-max': '(@grid-float-breakpoint - 1)',
  'container-tablet': '(720px + @grid-gutter-width)',
  'container-sm': '@container-tablet',
  'container-desktop': '(940px + @grid-gutter-width)',
  'container-md': '@container-desktop',
  'container-large-desktop': '(1140px + @grid-gutter-width)',
  'container-lg': '@container-large-desktop',
  'navbar-height': '50px',
  'navbar-margin-bottom': '@line-height-computed',
  'navbar-border-radius': '@border-radius-base',
  'navbar-padding-horizontal': 'floor((@grid-gutter-width / 2))',
  'navbar-padding-vertical': '((@navbar-height - @line-height-computed) / 2)',
  'navbar-collapse-max-height': '340px',
  'navbar-default-color': '#777',
  'navbar-default-bg': '#f8f8f8',
  'navbar-default-border': 'darken(@navbar-default-bg, 6.5%)',
  'navbar-default-link-color': '#777',
  'navbar-default-link-hover-color': '#333',
  'navbar-default-link-hover-bg': 'transparent',
  'navbar-default-link-active-color': '#555',
  'navbar-default-link-active-bg': 'darken(@navbar-default-bg, 6.5%)',
  'navbar-default-link-disabled-color': '#ccc',
  'navbar-default-link-disabled-bg': 'transparent',
  'navbar-default-brand-color': '@navbar-default-link-color',
  'navbar-default-brand-hover-color': 'darken(@navbar-default-brand-color, 10%)',
  'navbar-default-brand-hover-bg': 'transparent',
  'navbar-default-toggle-hover-bg': '#ddd',
  'navbar-default-toggle-icon-bar-bg': '#888',
  'navbar-default-toggle-border-color': '#ddd',
  'navbar-inverse-color': 'lighten(@gray-light, 15%)',
  'navbar-inverse-bg': '#222',
  'navbar-inverse-border': 'darken(@navbar-inverse-bg, 10%)',
  'navbar-inverse-link-color': 'lighten(@gray-light, 15%)',
  'navbar-inverse-link-hover-color': '#fff',
  'navbar-inverse-link-hover-bg': 'transparent',
  'navbar-inverse-link-active-color': '@navbar-inverse-link-hover-color',
  'navbar-inverse-link-active-bg': 'darken(@navbar-inverse-bg, 10%)',
  'navbar-inverse-link-disabled-color': '#444',
  'navbar-inverse-link-disabled-bg': 'transparent',
  'navbar-inverse-brand-color': '@navbar-inverse-link-color',
  'navbar-inverse-brand-hover-color': '#fff',
  'navbar-inverse-brand-hover-bg': 'transparent',
  'navbar-inverse-toggle-hover-bg': '#333',
  'navbar-inverse-toggle-icon-bar-bg': '#fff',
  'navbar-inverse-toggle-border-color': '#333',
  'nav-link-padding': '10px 15px',
  'nav-link-hover-bg': '@gray-lighter',
  'nav-disabled-link-color': '@gray-light',
  'nav-disabled-link-hover-color': '@gray-light',
  'nav-tabs-border-color': '#ddd',
  'nav-tabs-link-hover-border-color': '@gray-lighter',
  'nav-tabs-active-link-hover-bg': '@body-bg',
  'nav-tabs-active-link-hover-color': '@gray',
  'nav-tabs-active-link-hover-border-color': '#ddd',
  'nav-tabs-justified-link-border-color': '#ddd',
  'nav-tabs-justified-active-link-border-color': '@body-bg',
  'nav-pills-border-radius': '@border-radius-base',
  'nav-pills-active-link-hover-bg': '@component-active-bg',
  'nav-pills-active-link-hover-color': '@component-active-color',
  'pagination-color': '@link-color',
  'pagination-bg': '#fff',
  'pagination-border': '#ddd',
  'pagination-hover-color': '@link-hover-color',
  'pagination-hover-bg': '@gray-lighter',
  'pagination-hover-border': '#ddd',
  'pagination-active-color': '#fff',
  'pagination-active-bg': '@brand-primary',
  'pagination-active-border': '@brand-primary',
  'pagination-disabled-color': '@gray-light',
  'pagination-disabled-bg': '#fff',
  'pagination-disabled-border': '#ddd',
  'pager-bg': '@pagination-bg',
  'pager-border': '@pagination-border',
  'pager-border-radius': '15px',
  'pager-hover-bg': '@pagination-hover-bg',
  'pager-active-bg': '@pagination-active-bg',
  'pager-active-color': '@pagination-active-color',
  'pager-disabled-color': '@pagination-disabled-color',
  'jumbotron-padding': '30px',
  'jumbotron-color': 'inherit',
  'jumbotron-bg': '@gray-lighter',
  'jumbotron-heading-color': 'inherit',
  'jumbotron-font-size': 'ceil((@font-size-base * 1.5))',
  'jumbotron-heading-font-size': 'ceil((@font-size-base * 4.5))',
  'state-success-text': '#3c763d',
  'state-success-bg': '#dff0d8',
  'state-success-border': 'darken(spin(@state-success-bg, -10), 5%)',
  'state-info-text': '#31708f',
  'state-info-bg': '#d9edf7',
  'state-info-border': 'darken(spin(@state-info-bg, -10), 7%)',
  'state-warning-text': '#8a6d3b',
  'state-warning-bg': '#fcf8e3',
  'state-warning-border': 'darken(spin(@state-warning-bg, -10), 5%)',
  'state-danger-text': '#a94442',
  'state-danger-bg': '#f2dede',
  'state-danger-border': 'darken(spin(@state-danger-bg, -10), 5%)',
  'tooltip-max-width': '200px',
  'tooltip-color': '#fff',
  'tooltip-bg': '#000',
  'tooltip-opacity': 0.9,
  'tooltip-arrow-width': '5px',
  'tooltip-arrow-color': '@tooltip-bg',
  'popover-bg': '#fff',
  'popover-max-width': '276px',
  'popover-border-color': 'rgba(0,0,0,.2)',
  'popover-fallback-border-color': '#ccc',
  'popover-title-bg': 'darken(@popover-bg, 3%)',
  'popover-arrow-width': '10px',
  'popover-arrow-color': '@popover-bg',
  'popover-arrow-outer-width': '(@popover-arrow-width + 1)',
  'popover-arrow-outer-color': 'fadein(@popover-border-color, 5%)',
  'popover-arrow-outer-fallback-color': 'darken(@popover-fallback-border-color, 20%)',
  'label-default-bg': '@gray-light',
  'label-primary-bg': '@brand-primary',
  'label-success-bg': '@brand-success',
  'label-info-bg': '@brand-info',
  'label-warning-bg': '@brand-warning',
  'label-danger-bg': '@brand-danger',
  'label-color': '#fff',
  'label-link-hover-color': '#fff',
  'modal-inner-padding': '15px',
  'modal-title-padding': '15px',
  'modal-title-line-height': '@line-height-base',
  'modal-content-bg': '#fff',
  'modal-content-border-color': 'rgba(0,0,0,.2)',
  'modal-content-fallback-border-color': '#999',
  'modal-backdrop-bg': '#000',
  'modal-backdrop-opacity': 0.5,
  'modal-header-border-color': '#e5e5e5',
  'modal-footer-border-color': '@modal-header-border-color',
  'modal-lg': '900px',
  'modal-md': '600px',
  'modal-sm': '300px',
  'alert-padding': '15px',
  'alert-border-radius': '@border-radius-base',
  'alert-link-font-weight': 'bold',
  'alert-success-bg': '@state-success-bg',
  'alert-success-text': '@state-success-text',
  'alert-success-border': '@state-success-border',
  'alert-info-bg': '@state-info-bg',
  'alert-info-text': '@state-info-text',
  'alert-info-border': '@state-info-border',
  'alert-warning-bg': '@state-warning-bg',
  'alert-warning-text': '@state-warning-text',
  'alert-warning-border': '@state-warning-border',
  'alert-danger-bg': '@state-danger-bg',
  'alert-danger-text': '@state-danger-text',
  'alert-danger-border': '@state-danger-border',
  'progress-bg': '#f5f5f5',
  'progress-bar-color': '#fff',
  'progress-border-radius': '@border-radius-base',
  'progress-bar-bg': '@brand-primary',
  'progress-bar-success-bg': '@brand-success',
  'progress-bar-warning-bg': '@brand-warning',
  'progress-bar-danger-bg': '@brand-danger',
  'progress-bar-info-bg': '@brand-info',
  'list-group-bg': '#fff',
  'list-group-border': '#ddd',
  'list-group-border-radius': '@border-radius-base',
  'list-group-hover-bg': '#f5f5f5',
  'list-group-active-color': '@component-active-color',
  'list-group-active-bg': '@component-active-bg',
  'list-group-active-border': '@list-group-active-bg',
  'list-group-active-text-color': 'lighten(@list-group-active-bg, 40%)',
  'list-group-disabled-color': '@gray-light',
  'list-group-disabled-bg': '@gray-lighter',
  'list-group-disabled-text-color': '@list-group-disabled-color',
  'list-group-link-color': '#555',
  'list-group-link-hover-color': '@list-group-link-color',
  'list-group-link-heading-color': '#333',
  'panel-bg': '#fff',
  'panel-body-padding': '15px',
  'panel-heading-padding': '10px 15px',
  'panel-footer-padding': '@panel-heading-padding',
  'panel-border-radius': '@border-radius-base',
  'panel-inner-border': '#ddd',
  'panel-footer-bg': '#f5f5f5',
  'panel-default-text': '@gray-dark',
  'panel-default-border': '#ddd',
  'panel-default-heading-bg': '#f5f5f5',
  'panel-primary-text': '#fff',
  'panel-primary-border': '@brand-primary',
  'panel-primary-heading-bg': '@brand-primary',
  'panel-success-text': '@state-success-text',
  'panel-success-border': '@state-success-border',
  'panel-success-heading-bg': '@state-success-bg',
  'panel-info-text': '@state-info-text',
  'panel-info-border': '@state-info-border',
  'panel-info-heading-bg': '@state-info-bg',
  'panel-warning-text': '@state-warning-text',
  'panel-warning-border': '@state-warning-border',
  'panel-warning-heading-bg': '@state-warning-bg',
  'panel-danger-text': '@state-danger-text',
  'panel-danger-border': '@state-danger-border',
  'panel-danger-heading-bg': '@state-danger-bg',
  'thumbnail-padding': '4px',
  'thumbnail-bg': '@body-bg',
  'thumbnail-border': '#ddd',
  'thumbnail-border-radius': '@border-radius-base',
  'thumbnail-caption-color': '@text-color',
  'thumbnail-caption-padding': '9px',
  'well-bg': '#f5f5f5',
  'well-border': 'darken(@well-bg, 7%)',
  'badge-color': '#fff',
  'badge-link-hover-color': '#fff',
  'badge-bg': '@gray-light',
  'badge-active-color': '@link-color',
  'badge-active-bg': '#fff',
  'badge-font-weight': 'bold',
  'badge-line-height': 1,
  'badge-border-radius': '10px',
  'breadcrumb-padding-vertical': '8px',
  'breadcrumb-padding-horizontal': '15px',
  'breadcrumb-bg': '#f5f5f5',
  'breadcrumb-color': '#ccc',
  'breadcrumb-active-color': '@gray-light',
  'breadcrumb-separator': '"/"',
  'carousel-text-shadow': '0 1px 2px rgba(0,0,0,.6)',
  'carousel-control-color': '#fff',
  'carousel-control-width': '15%',
  'carousel-control-opacity': 0.5,
  'carousel-control-font-size': '20px',
  'carousel-indicator-active-bg': '#fff',
  'carousel-indicator-border-color': '#fff',
  'carousel-caption-color': '#fff',
  'close-font-weight': 'bold',
  'close-color': '#000',
  'close-text-shadow': '0 1px 0 #fff',
  'code-color': '#c7254e',
  'code-bg': '#f9f2f4',
  'kbd-color': '#fff',
  'kbd-bg': '#333',
  'pre-bg': '#f5f5f5',
  'pre-color': '@gray-dark',
  'pre-border-color': '#ccc',
  'pre-scrollable-max-height': '340px',
  'component-offset-horizontal': '180px',
  'text-muted': '@gray-light',
  'abbr-border-color': '@gray-light',
  'headings-small-color': '@gray-light',
  'blockquote-small-color': '@gray-light',
  'blockquote-font-size': '(@font-size-base * 1.25)',
  'blockquote-border-color': '@gray-lighter',
  'page-header-border-color': '@gray-lighter',
  'dl-horizontal-offset': '@component-offset-horizontal',
  'dl-horizontal-breakpoint': '@grid-float-breakpoint',
  'hr-border': '@gray-lighter'
}

},{}],39:[function(require,module,exports){

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


},{"./alert.js":36,"./bs-mixins.js":37,"./bs-vars.js":38,"./less-helper.js":40,"./less-parser.js":41,"./normalize.js":42,"./scaffolding.js":43,"objutil":35}],40:[function(require,module,exports){
'use strict'
// use strict-mode to get func.call work with right this
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call


var _extend = require('objutil').extend
var ColorNames = require('less/lib/less/data/colors')
var Color = require('less/lib/less/tree/color')
var Dimension = require('less/lib/less/tree/dimension')
var Functions = require('less/lib/less/functions')()

function mixin() {
  var args = [].slice.call(arguments)
  args.forEach(function(v) {
    v.$vars = v.$vars || {}
  })
  return _extend.apply(null, args)
}

// invoke LESS Functions with param
function hasFunction(name) {
  return Functions.functionRegistry.get(name)
}

function getFuncion(name) {
  var args = [].slice.call(arguments, 1)
  return function(prev, node) {
    var ret = Functions.functionRegistry.get(name).apply(null, args.map(function(val) {
      return _getObj(val, node)
    }))
    return this ? ret.toCSS() : ret
  }
}

function _getObj(v, node) {
  if(v.type) return v
  if(typeof v=='function') return v.call(null, null, node)
  return typeof v=='string' && v.charAt(0)=='@' ? getObj(getVar(v)(null,node)) : getObj(v)
}

function _getVar(name, node) {
  var parent = node, val
  while (parent) {
    var $vars = parent.children.$vars
    if($vars && (val = $vars.prop[name.slice(1)])) return val[0]
    parent = parent.parent
  }
}

// getVar from node.$var value
function getVar(name, context) {
  context = context || {}
  return function (prev, node) {
    var val = context[name] || _getVar(name, node)
    return val
  }
}

// operation for css value, Dimension, Color
function Operation(op1, op, op2) {
  return function(prev, node) {
    var p = [op1, op2].map(function(v) {
      if(Array.isArray(v)) v = Operation.apply(null, v)(prev, node)
      return _getObj(v, node)
    })
    var val = p[0].operate({}, op, p[1])
    return this ? val.toCSS() : val
  }
}

// convert string into LESS Object
// current working type: Dimension, Color
var getObj = function(val) {
  // it's has to be string type to get LESS Object
  val += ''

  val = ColorNames[val] || val

  if(val.charAt(0)=='#') return new Color(val.slice(1))

  var match = val.match(/^rgba?\((.*)\)/)
  if(match) {
    var alpha=1, rgba = match[1].split(',')
    var rgb = rgba.length>3 ? (alpha=rgba.pop(), rgba) : rgba
    return new Color(rgb, alpha)
  }

  var match = val.match(/^([0-9.]+)([a-z%]*)/i)
  if(match) return new Dimension(match[1], match[2])

  return val
}

function lessValuePlugin(option) {
  return function(val,key,node,result) {
    return typeof val=='string' && val.charAt(0)=='@' ? getVar(val)(val,node) : val
  }
}

function getMixin (obj) {
  return function() {
    var keys = obj.$vars ? Object.keys(obj.$vars) : ''
    keys && [].slice.call(arguments).forEach(function(v, i) {
      obj.$vars[keys[i]] = v
    })
    return obj
  }
}

module.exports = {
  mixin : mixin,
  getVar : getVar,
  getObj : getObj,
  hasFunction : hasFunction,
  getFuncion : getFuncion,
  getMixin : getMixin,
  Operation : Operation,
  ColorNames : ColorNames,
  Color : Color,
  Dimension : Dimension,
  Functions : Functions,
  lessValuePlugin : lessValuePlugin,
}

},{"less/lib/less/data/colors":2,"less/lib/less/functions":10,"less/lib/less/tree/color":19,"less/lib/less/tree/dimension":23,"objutil":35}],41:[function(require,module,exports){

var lessHelper = require('./less-helper.js')

function walkObj(obj, option) {
  option = option||{}

  $mixins = option.mixins = option.mixins||obj.$mixins
  if(obj.$mixin)
    for(var k in obj.$mixin){
      lessHelper.mixin(obj, $mixins[k].apply(null, obj.$mixin[k]))
    }

  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue
    var v = obj[k]
    // if(k=='$mixin' && $mixins[v[0]]) lessHelper.mixin(obj, $mixins[v[0]].apply(null, v.slice(1)))
    if(typeof v=='string') obj[k] = parseExpression(v)
    if(v && typeof v=='object') walkObj(v, option)
  }
  return obj
}


function parseExpression(str) {
  // var str = 'ceil((@font-size-base * -1.7))'
  // str = '(ceil((8.2 - 3)) + (3 + 2))'

  var arr = []
  parseStr(str, arr)
  console.log(arr[0])
  // console.log( 3333, arr[0], applyArr(arr[0]) )
  return applyArr(arr[0])
}

function applyArr(arr) {
  return Array.isArray(arr)
    ? arr[0].apply(null, arr.slice(1).map(function(v) {
      return Array.isArray(v) ? applyArr(v) : v
    }))
  : arr
}

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
  if (match && lessHelper.hasFunction(match[1]) ) {
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
  callArr.push(val)
  return callArr
}

function transform(obj) {
  var mixins = obj.$mixins
  if(mixins)
    for(var k in mixins) {
      mixins[k] = lessHelper.getMixin(mixins[k])
    }
  return walkObj(obj)
}


module.exports = {
  transform: transform,
  parse: parseExpression
}


},{"./less-helper.js":40}],42:[function(require,module,exports){
var obj = {
  html: {
    fontFamily: 'sans-serif',
    MsTextSizeAdjust: '100%',
    WebkitTextSizeAdjust: '100%'
  },
  body: {
    margin: 0
  },
  'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary': {
    display: 'block'
  },
  'audio, canvas, progress, video': {
    display: 'inline-block',
    verticalAlign: 'baseline'
  },
  'audio:not([controls])': {
    display: 'none',
    height: 0
  },
  '[hidden], template': {
    display: 'none'
  },
  a: {
    backgroundColor: 'transparent'
  },
  'a:active, a:hover': {
    outline: 0
  },
  'abbr[title]': {
    borderBottom: '1px dotted'
  },
  'b, strong': {
    fontWeight: 'bold'
  },
  dfn: {
    fontStyle: 'italic'
  },
  h1: {
    fontSize: '2em',
    margin: '0.67em 0'
  },
  mark: {
    background: '#ff0',
    color: '#000'
  },
  small: {
    fontSize: '80%'
  },
  'sub, sup': {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline'
  },
  sup: {
    top: '-0.5em'
  },
  sub: {
    bottom: '-0.25em'
  },
  img: {
    border: 0
  },
  'svg:not(:root)': {
    overflow: 'hidden'
  },
  figure: {
    margin: '1em 40px'
  },
  hr: {
    boxSizing: 'content-box',
    height: 0
  },
  pre: {
    overflow: 'auto'
  },
  'code, kbd, pre, samp': {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  },
  'button, input, optgroup, select, textarea': {
    color: 'inherit',
    font: 'inherit',
    margin: 0
  },
  button: {
    overflow: 'visible'
  },
  'button, select': {
    textTransform: 'none'
  },
  'button, html input[type="button"],  input[type="reset"], input[type="submit"]': {
    WebkitAppearance: 'button',
    cursor: 'pointer'
  },
  'button[disabled], html input[disabled]': {
    cursor: 'default'
  },
  'button::-moz-focus-inner, input::-moz-focus-inner': {
    border: 0,
    padding: 0
  },
  input: {
    lineHeight: 'normal'
  },
  'input[type="checkbox"], input[type="radio"]': {
    boxSizing: 'border-box',
    padding: 0
  },
  'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
    height: 'auto'
  },
  'input[type="search"]': {
    WebkitAppearance: 'textfield',
    boxSizing: 'content-box'
  },
  'input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration': {
    WebkitAppearance: 'none'
  },
  fieldset: {
    border: '1px solid #c0c0c0',
    margin: '0 2px',
    padding: '0.35em 0.625em 0.75em'
  },
  legend: {
    border: 0,
    padding: 0
  },
  textarea: {
    overflow: 'auto'
  },
  optgroup: {
    fontWeight: 'bold'
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  'td, th': {
    padding: 0
  }
}


module.exports = obj



},{}],43:[function(require,module,exports){
// scaffolding


var obj = {
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
    '&:focus': {
      '$mixin': {'.tab-focus': []}
    }
  },
  figure: {
    margin: 0
  },
  img: {
    verticalAlign: 'middle'
  },
  '.img-responsive': {
    $mixin: {'.img-responsive':[]}
  },
  '.img-rounded': {
    borderRadius: '@border-radius-large'
  },
  '.img-thumbnail': {
    padding: '@thumbnail-padding',
    lineHeight: '@line-height-base',
    backgroundColor: '@thumbnail-bg',
    border: '1px solid @thumbnail-border',
    borderRadius: '@thumbnail-border-radius',
    transition: 'all .2s ease-in-out',
    $mixin: {'.img-responsive':[]}
  },
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

},{}]},{},[39]);
