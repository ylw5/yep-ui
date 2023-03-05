# Collapse 折叠面板
通过折叠面板收纳内容区域
```
<Collapse.Root>
  <Collapse.Trigger />
  <Collapse.Panel />
</Collapse.Root>
```


:::card 基础用法
同时打开多个面板，互相之间不会影响。
:::code collapseBasic
<<< story/collapse/Basic.vue
:::

:::card 自定义样式
Trigger 以及 Panel 组件都会暴露出插槽变量 `open` ,用于内部访问当前状态。`data-state = open` 也会追加到当前组件上，用于自定义样式。

:::code collapseStyle
<<< story/collapse/Style.vue
:::

:::card 静态
在 Panel 组件上设置 `static` 属性可以让面板始终保持打开状态。
:::code collapseStatic
<<< story/collapse/Static.vue
:::


:::card 手动关闭
Panel 组件上的插槽暴露了一个 `close` 函数，可以用于手动关闭当前面板。

以下例子中，点击按钮会会延迟 1s 关闭当前面板。
:::code collapseClose
<<< story/collapse/Close.vue
:::

## TODO
- 添加 Group 组件，用于管理多个 Collapse 组件，从而实现手风琴效果，或默认打开效果。
- 展开动画



