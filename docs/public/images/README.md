# 图片资源文件夹

此文件夹用于存放文档中使用的图片资源。

## 使用方法

在 Markdown 文件中引用图片时，请使用以 `/images/` 开头的绝对路径。

例如，如果您在此文件夹中放入了 `example.png`，则在文档中引用如下：

```markdown
![示例图片](/images/example.png)
```

VitePress 会自动将 `docs/public` 目录下的内容复制到构建输出的根目录。
