# 弹出框
触发弹出一个气泡框。

可用于 tooltip、popover 等场景。

### CSS
| 名称        |      类型      | 描述 |
| ------------- | :-----------: | ----: |
| popper-panel     | `Component` | 弹出框主体 |
| popper-arrow     | `Component` | 弹出框箭头 |
...


```
<Popper.Root>
  <Popper.Trigger />
  <Popper.Anchor />
  <Popper.Panel>
    <Popper.PanelArrow />
  </Popper.Panel>
</Popper.Root>
```
:::card 基本用法
默认触发条件为点击，可以通过 `trigger` 属性来设置触发条件。
:::code popperBasic
<<< story/popper/Basic.vue
:::

:::card 箭头
使用 `<PanelArrow />` 元素可以为弹出框添加箭头。
:::code popperArrow
<<< story/popper/Arrow.vue
:::


:::card 设置方位
因为 `Popper` 是基于 PopperJS 实现的，所以可以通过 `placement` 属性来改变弹出框的方位。
可能的值：

<table>
<tr>
<td><code>bottom-start</code></td>
<td><code>bottom</code> <em>(default)</em></td>
<td><code>bottom-end</code></td></tr>
<tr>
<td><code >auto-start</code></td>
<td><code>auto</code></td>
<td><code>auto-end</code></td>
</tr>
<tr>
<td><code>top-start</code></td>
<td><code>top</code></td>
<td><code>top-end</code></td>
</tr>
<tr>
<td><code>left-start</code></td>
<td><code>left</code></td>
<td><code>left-end</code></td>
</tr>
<tr><td><code>right-start</code></td>
<td><code>right</code></td>
<td><code>right-end</code></td>
</tr>
</table>


:::code popperPlacement
<<< story/popper/Placement.vue
:::

:::card 相对元素（锚点）
默认情况使用触发元素 `Trigger` 作为锚点，可以通过 `Anchor`元素来指定锚点。
:::code popperAnchor
<<< story/popper/Anchor.vue
:::




## TODO
- 多触发方式 
  - [ ] 悬浮
  - [x] 悬浮（忽略主体）
  - [ ] 点击
  - [ ] 聚焦
  - [x] 手动
- 可配置更多 PopperJS 相关属性
