# Radio 单选框
在一组备选项中进行单选。

### CSS
| 名称        |      类型      | 描述 |
| ------------- | :-----------: | ----: |
| radio     | `Component` | 单选按钮，若用在普通元素（非 radio）上需搭配父元素的 group 样式 |
...

:::card 基础用法

只需要给 RadioGroup 组件设置 `v-model` 绑定变量，选中意味着变量的值为对应 RadioOption 的 `value` 属性值，`value` 可以是任意值（后文详细说明）。

在不使用插槽的情况下，RadioOption 内部自带一个 radio 元素和内容为 `value` 的文本节点，如果需要自定义内容，可以使用插槽。
:::code radiogroupBasic
<<< story/radiogroup/Basic.vue
:::


:::card 自定义样式

`Option` 组件上暴露默认插槽的内部变量： `active`、`checked`，同时也会在元素上添加对应的 `data-state` 属性。

:::code radiogroupStyle
<<< story/radiogroup/Style.vue
:::

:::card 绑定对象

原生表单控件只允许提供字符串类型的值，但是现在我们可以绑定对象，为。

默认情况下，通过比较 `<Group>` 上绑定的对象和 `<Option>` 上绑定的是否是同一个实例来判断单选框是否被选中；也可以通过添加 `by` 属性来自定义判断方式。
:::code radiogroupBindObject
<<< story/radiogroup/BindObject.vue
:::

:::card 在表单中使用

如果 `name` 属性被添加，那么一个隐藏的 `input` 元素会被渲染，用于表单提交。
:::code radiogroupForm
<<< story/radiogroup/Form.vue
:::

此时如下元素会被渲染会被渲染。
```
<input type="hidden" name="plan" value="startup" />
```
注意：如果此时绑定的值是一个复杂类型，会对其进行特殊处理。


:::card 非受控组件

如果使用 `defaultValue` 属性替代`<Group>` 上的 `value` 属性，那么组件将会变为非受控组件.
:::code radiogroupUncontrol
<<< story/radiogroup/Uncontrol.vue
:::

:::card 使用 Label

为了更好的访问性，可以使用 `<Label>` 组件。

通过 aria-labelledby 以及自动生成的 ID 自动将每个组件链接到其祖先 `<RadioGroupOption>` 组件，从而增强组件的语义和可访问性。
:::code radiogroupLabel
<<< story/radiogroup/Label.vue
:::






