import { defineConfig } from 'vitepress'
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
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
          ],
        },
        {
          text: '数据输入组件',
          items: [
            { text: '复选框 checkbox', link: '/components/checkbox' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: '弹出 Popper', link: '/components/popper' },
          ],
        },
      ],
    },
  },
})
