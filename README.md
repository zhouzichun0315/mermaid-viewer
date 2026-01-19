# Mermaid 流程图在线编辑器

一个简洁的在线 Mermaid 图表编辑器，支持实时预览、导出图片和多种图表模板。

## 功能特性

- **实时预览** - 输入 Mermaid 代码，即时渲染图表
- **导出图片** - 支持导出 PNG（高清 2x）和 SVG 格式
- **示例模板** - 内置流程图、时序图、类图、状态图、饼图、甘特图等模板
- **主题切换** - 支持亮色/暗色主题，自动保存偏好
- **纯静态** - 无需后端，可部署在任意静态托管服务

## 在线使用

访问：https://zhouzichun0315.github.io/mermaid-viewer/

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/zhouzichun0315/mermaid-viewer.git

# 进入目录
cd mermaid-viewer

# 启动本地服务器（任选其一）
python3 -m http.server 8080
# 或
npx serve .

# 打开浏览器访问 http://localhost:8080
```

## 支持的图表类型

| 类型 | 语法示例 |
|------|----------|
| 流程图 | `graph TD` / `graph LR` |
| 时序图 | `sequenceDiagram` |
| 类图 | `classDiagram` |
| 状态图 | `stateDiagram-v2` |
| 饼图 | `pie` |
| 甘特图 | `gantt` |
| Git 分支图 | `gitGraph` |

## 技术栈

- HTML / CSS / JavaScript
- [Mermaid.js](https://mermaid.js.org/) - 图表渲染
- [html2canvas](https://html2canvas.hertzen.com/) - PNG 导出

## License

MIT
