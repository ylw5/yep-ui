export function withInstall<T>(component: T): T & { install(app: App): void } {
  const c = component as T & { install(app: App): void }
  c.install = (app: App) => {
    app.component(c.name, c)
  }
  return c
}
