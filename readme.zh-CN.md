# create-vlib

[![npm](https://img.shields.io/npm/v/create-vlib.svg)](https://www.npmjs.com/package/create-vlib)
[![npm](https://img.shields.io/npm/l/create-vlib.svg)](https://github.com/faressoft/create-vlib/blob/master/LICENSE)

快速创建 Vue 组件库的脚手架。

# Features

- 基于[`vitepress-for-component`](https://github.com/dewfall123/vitepress-for-component.git)一键启动开发环境，一键生成文档。
- 基于`vite`一键打包。
- 使用[`np`](https://github.com/sindresorhus/np)发布版本（非常 nice 的发布工具）。
- 使用`gh-pages`一键发布 github.io 文档。
- 集成`eslint` `prettier` `ls-lint` 等 lint 工具。
- 集成`husky` `conventional-changelog-cli`等工具。

# 使用

执行命令 `yarn create vlib`。

三种模板可以选择：

- vue-multiple-components Vue 组件（多个）。
- vue-single-component Vue 组件（单个）。
- ts-lib TS 库。
