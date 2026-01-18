# API 调用失败问题分析

## 🔍 问题诊断

环境变量已正确添加到 Vercel，但 API 调用失败。经过分析，发现了以下问题：

### 核心问题：Vercel 配置不正确

当前的 `vercel.json` 使用了 **Vercel v2 配置**（已废弃），而且路由配置可能导致 API 无法正确访问。

## ✅ 解决方案

### 方案 1：使用 Vercel 推荐的配置（简化版）

删除或更新 `vercel.json`，让 Vercel 自动检测 API Routes。

Vercel 的 Serverless Functions 约定：
- `/api` 目录下的文件会自动成为 API 路由
- `/api/health.js` → 自动映射为 `/api/health`

### 方案 2：检查环境变量作用域

确保环境变量在 Vercel 中配置为：
- **Production**: ✅ 必须勾选
- **Preview**: ✅ 建议勾选
- **Development**: ✅ 建议勾选

### 方案 3：添加 CORS 头（如果跨域问题）

在 `api/health.js` 中添加 CORS 头。

## 🔧 立即修复步骤

### 步骤 1：更新 Vercel 配置

将 `vercel.json` 更新为更简洁的版本（见下方新文件）。

### 步骤 2：重新部署环境变量

在 Vercel 后台：
1. Settings → Environment Variables
2. 确认 `DEEPSEEK_API_KEY` 存在
3. 确保勾选了 **Production**, **Preview**, **Development**
4. 如果之前只勾选了一个，请重新添加或编辑

### 步骤 3：重新部署

推送代码或在 Vercel 后台手动触发重新部署。

## 📝 调试技巧

### 在浏览器查看错误

1. 打开部署后的网页
2. F12 打开开发者工具
3. 转到 Network 选项卡
4. 尝试使用健康助手功能
5. 查看 `/api/health` 请求的状态和响应

### 常见错误和解决方法

| 状态码 | 错误信息 | 原因 | 解决方法 |
|--------|----------|------|----------|
| 404 | Not Found | API 路由未找到 | 检查 `vercel.json` 配置 |
| 500 | API 配置错误 | 环境变量未设置 | 重新添加环境变量并勾选所有环境 |
| 500 | Internal Server Error | DeepSeek API 调用失败 | 检查 API Key 是否正确 |
| 405 | Method Not Allowed | 请求方法错误 | 应该使用 POST 请求 |

## 🎯 推荐的 vercel.json

见新创建的 `vercel.json` 文件。
