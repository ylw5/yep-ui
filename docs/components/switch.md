# Switch(Toggle) 开关
表示在两种状态之间切换值，多用于触发「开/关」；并提供与复选框元素相同的语义和键盘导航。
```
<Switch.Group>
  <Switch.Root />
  <Switch.Label />
</Switch.Group>
```
:::card 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。聚焦时，可以使用空格或回车键来切换状态。

:::code switchBasic
<<< story/switch/Basic.vue
:::

:::card 自定义样式

使用插槽变量或 `data-state` 属性来自定义样式。css预设中提供了`data-checked:`。

:::code switchStyle
<<< story/switch/Style.vue
:::


:::card 使用自定义 label

默认情况下，Switch（Root） 是一个 `button` 元素，因此可以自由地使用插槽自定义内容.

在这种情况下，可以使用 `Label` 组件增加灵活度。
:::code switchLabel 
<<< story/switch/Label.vue
:::

:::card 在表单中使用

如果添加了 `name` 属性，一个隐藏的 `input` 元素将会被渲染，和开关状态同步，用于表单提交。
:::code switchForm
<<< story/switch/Form.vue
:::
默认情况下，选中开关时该值将为“on”，取消选中开关时该值不存在。
```html
<input type="hidden" name="notifications" value="on" />
```


:::card 非受控模式

如果提供了 `defaultChecked` 属性，Switch 将会变成非受控组件，可以使用插槽变量查看内部状态。
:::code switchUncontrolled
<<< story/switch/Uncontrolled.vue
:::








