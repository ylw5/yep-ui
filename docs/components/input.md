# Input 输入框
通过鼠标或键盘输入字符

:::card 基础用法<Badge type="tip" text="css" />
`<Root/>` 就是原生 `input` 标签，用法完全一样
:::code inputBasic
<<< story/input/Basic.vue
:::

:::card 尺寸<Badge type="tip" text="css" />
分为四种大小，`lg` `md` `sm` `xs`
:::code inputSize
<<< story/input/Size.vue
:::

:::card 组合（前缀/后缀）
使用 `<Group />` 组件后，理论上通过插槽可以实现任意组合，为了保证样式统一，此时应将预设 `inputgroup` 样式设置在 `<Group />` 上。
:::code inputGroup
<<< story/input/Group.vue
:::

:::card 一键清除
`<Clear />`插槽中的内容会在输入框有内容时显示，点击后清空输入框。默认为 `carbon:close-outline`。
:::code inputClear
<<< story/input/Clear.vue
:::


## TODO
- support textarea
- passport
- formatter


