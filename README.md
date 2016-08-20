# cssobj-less

Using LESS as JS Object, based on [cssobj](https://github.com/cssobj/cssobj)

[Bootstrap in JS Demo](https://futurist.github.io/cssobj-less/) - [Github Repo](https://github.com/futurist/cssobj-less)

## Install

``` javascript
npm i -g cssobj-converter
npm i futurist/cssobj-less
```

## Usage

[Small Demo](https://futurist.github.io/cssobj-less/test/)

### Write LESS in `folder` as your normal way:

*file: lessfiles/page.less*

``` less
@base: #f938ab;
@width: 100px;
@padding: 10px;

.box-shadow(@style, @alpha: 50%) {
  box-shadow: @style rgba(0, 0, 0, @alpha);
}
.box {
  width: (@width * 2);
  padding: @padding;
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 0.3) }
}
```

### Convert LESS to JS using [cssobjconv](https://github.com/cssobj/cssobj-converter)

``` bash
cssobjconv -d lessfiles
# or watch mode:
# cssobjconv -d lessfiles -w
```

*Notice: you should add a variable, e.g. var page={} manually*

### Include `lessfiles/page.less.js` into your `html`, with `dist/lessobj.js`

``` html
<script src="dist/lessobj.js"></script>
<script src="lessfiles/page.less.js"></script>
<script>
var result = lessobj(page)
</script>
```

### Enjoy LESS in JS! and you can update `@vars` as below:

``` javascript
page.$vars.base = 'blue'
result.update()
```

Any `@vars` can be changed dynamically!

## Plus

You can use `selector:extend(.abc)`, to **extend** the rule.

Also, you can use `$test` as key to dynamically enable/disable the rule.


James Yang (c) 2016 MIT
