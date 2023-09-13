# CLI

使用 CLI 添加组件到项目中

## init

使用 `init` 命令初始化配置和依赖。

`init` 命令将自动给项目安装需要的依赖，配置 `uno.config.ts` 文件，以及添加必要的 CSS 变量。

```bash
npx yep-ui@latest init
```

你将被询问一下选项，会根据你的选择来生成配置文件 `components.json`。

```
Which style would you like to use? › Default
Where is your global CSS file? › › app/globals.css
Where is your uno.config.js located? › uno.config.ts
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
```

### Options

```
Usage: yep-ui init [options]
initialize your project and install dependencies
Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

## add

使用 `add` 命令添加组件和依赖到项目中。

```bash
npx yep-ui@latest add [component]
```

你可以直接从给出的组件列表中选择：

```
Which components would you like to add? › Space to select. Return to submit.
◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  calendar
◯  card
◯  checkbox
```