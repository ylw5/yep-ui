# 复选框

在一组备选项中进行多选。
```
<Checkbox.Group>
  <Checkbox.Root>
    <Checkbox.Indicator />
  </Checkbox.Root>
</Checkbox.Group>
```

### CSS
| 名称        |      类型      | 描述 |
| ------------- | :-----------: | ----: |
| checkbox     | `Component` | 复选框按钮 |
| indicator     | `Component` | 复选框提示器 |
...

:::card 基础用法
表示两种状态之间的切换。

`value` 用于绑定值。如果不指定 `value`，会优先使用插槽中的首个文字节点内容作为绑定值。

:::code checkboxBasic
<<< story/checkbox/Basic.vue
:::
<p class="text-xs text-red-4">FIXME: 插槽模式下样式未统一</p>

:::card 自定义选框样式
理论上利用插槽和 css 可以实现任何样式的选框
:::code checkboxCustomIndicator
<<< story/checkbox/CustomIndicator.vue
:::

:::card 受控模式

:::code checkboxControl
<<< story/checkbox/Control.vue
:::

:::card 多选框组
使用于多个勾选框绑定到同一数组的情景。

使用 `v-model` 为多选框组绑定数组。如果单选框的值（`value` 或插槽中的首个文字节点内容）存在于数组内，就处于选中状态，反之亦然。
:::code checkboxGroup
<<< story/checkbox/Group.vue
:::

:::card 可选项目数量限制
使用 `min` 和 `max` 属性可以限制可选项目数量
:::code checkboxGroupLimit
<<< story/checkbox/GroupLimit.vue
:::





## TODO
- 焦点管理
- 勾选动画
- 中间态

