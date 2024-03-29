import { defineConfig } from 'vitepress'
import Container from 'markdown-it-container'
export default defineConfig({
  title: 'Yep UI',
  description: 'A Vue 3 UI Library',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: 'Yep UI', link: '/guide/' },
          ],
        },
        {
          text: '快速上手',
          items: [
            { text: '安装', link: '/guide/install' },
            { text: 'CLI', link: '/guide/CLI' },
          ],
        },
      ],
      '/components/': [
        {
          text: '通用组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
          ],
        },
        {
          text: '数据输入组件',
          items: [
            { text: 'RadioGroup 单选框', link: '/components/radio' },
            { text: 'Checkbox 复选框 ', link: '/components/checkbox' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Switch(Toggle) 开关', link: '/components/switch' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Popper 弹出框 ', link: '/components/popper' },
            { text: 'Tooltip 弹出提示 ', link: '/components/tooltip' },
          ],
        },
      ],
    },
  },
  markdown: {
    config: (md) => {
      md.use(Container, 'card', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          // console.log('token :>> ', token)

          const title = token.info.trim().slice(5).trim()

          const titleHtml = md.render(`## ${title}`)

          return token.nesting === 1 ? `<Demo>${titleHtml}` : '</Demo>\n'
        },
      })

      md.use(Container, 'code', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          // console.log('token :>> ', token)
          const demoName = token.info.trim().slice(5).trim()

          return token.nesting === 1 ? `<template #demo><${demoName} /></template><template #code>` : '</template>\n'
        },
      })
    },
  },

})
