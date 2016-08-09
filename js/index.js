var result = cssobj(obj, {
  onUpdate: cssobj_plugin_post_csstext(console.log)
})

console.log(result)
