# OpenClaw DeepWiki (中文文档)

OpenClaw 第三方deepwiki中文翻译与维护项目。本项目使用 [VitePress](https://vitepress.dev/) 构建。

## 功能特性

- 📚 完整的 OpenClaw 架构与 API 文档
- 🔄 自动化文档清理工具 (基于 DeepSeek 模型)
- 🚀 GitHub Actions 自动部署

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.10+ (仅用于清理脚本)

### 安装依赖

```bash
# 安装文档构建依赖
npm install

# (可选) 安装文档清理工具依赖
pip install agno
```

### 本地开发

启动本地开发服务器：

```bash
npm run docs:dev
```

### 构建文档

构建静态文件：

```bash
npm run docs:build
```

预览构建结果：

```bash
npm run docs:preview
```

## 文档清理工具

本项目包含一个基于 AI 的文档清理工具 `docs/clean.py`，用于规范化 Markdown 格式。

### 配置

在运行之前，请确保设置了 `DEEPSEEK_API_KEY` 环境变量，或者直接修改 `docs/clean.py` 中的配置。

### 使用方法

```bash
# 清理指定目录下的 Markdown 文件
python docs/clean.py docs/

# 仅重试之前失败的文件
python docs/clean.py docs/ --retry

# 清理生成的备份文件 (.md.backup)
python docs/clean.py --clean-backups
```

## 部署

本项目配置了 GitHub Actions，当推送到 `main` 分支时会自动构建并部署到 GitHub Pages。
