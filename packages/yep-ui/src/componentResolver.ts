import type { ComponentResolver } from 'unplugin-vue-components'
function resolveComponent(name: string) {
  const [component, sub] = name.split('.')
  if (component && sub) {
    return {
      name: `${component}${sub}`,
      from: 'yep-ui',
    }
  }
}

// TODO: support options
export function YepResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: resolveComponent,
  }
}
