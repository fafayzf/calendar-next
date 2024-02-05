import type { App, Component, Plugin } from 'vue'

function withInstall(comp: Component): Plugin {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.name, comp)
  }

  return comp as Plugin
}

export default {
  withInstall,
}
