declare module 'vue' {
  export interface GlobalComponents {
    Dialog: typeof import('yep-ui')['Dialog']
    Checkbox: typeof import('yep-ui')['Checkbox']
  }
}

export  {}
