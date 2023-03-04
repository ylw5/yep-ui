# Select 选择器
下拉菜单选择内容。
```
<Selct.Root>
  <Selct.Label />
  <Select.Trigger />
  <Select.Options>
    <Select.Option />
  </Select.Options>
</Select.Root>
```


### CSS
| 名称        |      类型      | 描述 |
| ------------- | :-----------: | ----: |
|  select-options    | `Component` | 选项菜单 |
|  select-option    | `Component` | 选项 |
...


:::card 基础用法
使用 `v-model` 双向绑定选择内容，可使用键盘进行导航。
:::code selectBasic
<<< story/select/Basic.vue
:::

:::card 自定义样式
使用插槽变量和样式类名
:::code selectStyle
<<< story/select/Style.vue
:::

:::card 绑定对象
可使用属性 `by` 设置对象之间对比的方法，当为 String 时默认比较对象的该属性值，当为 Function 时，会将对象作为参数传入，返回值为 Boolean。
:::code selectBindObject
<<< story/select/BindObject.vue
:::


:::card 多选
使用 `multiple` 属性，可多选。
:::code selectMulti
<<< story/select/Multi.vue
:::


:::card 用于表单
当name属性存在时，会自动渲染一个hidden的input，用于表单提交。

:::

:::card 非受控组件
当 defaultValue 存在时，组件为非受控组件，此时 value 无效。
:::code selectUncontrolled
<<< story/select/Uncontrolled.vue
:::

:::card Label

:::code selectLabel
<<< story/select/Label.vue
:::

:::card 手动控制开关
当设置 static 属性后，Options 将不会自动打开和关闭，需要手动控制。
:::code selectManual
<<< story/select/Manual.vue
:::






