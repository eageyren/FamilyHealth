# 馨婷的家书 - 部署指南

## 📋 安全检查

- API Key 通过环境变量 `process.env.DEEPSEEK_API_KEY` 读取
- `.env.example` 只包含示例配置
- 实际的 `.env` 文件已被 `.gitignore` 忽略

## 🚀 部署到 Vercel（通过 GitHub）

### 步骤 1：推送到 GitHub

1. **初始化 Git 仓库**（如果还没有）
   ```bash
   cd e:\AllDemo\Family
   git init
   ```

2. **添加所有文件**
   ```bash
   git add .
   ```

3. **提交代码**
   ```bash
   git commit -m "Initial commit: 馨婷的家书"
   ```

4. **在 GitHub 创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称：例如 `family-letter`
   - 选择 Public 或 Private
   - **不要**勾选 "Add a README file"
   - 点击 "Create repository"

5. **关联远程仓库并推送**
   ```bash
   git remote add origin https://github.com/你的用户名/family-letter.git
   git branch -M main
   git push -u origin main
   ```

### 步骤 2：在 Vercel 导入项目

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入 GitHub 仓库**
   - 点击 "Add New..." → "Project"
   - 选择你刚创建的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: 选择 "Other"（或保持默认）
   - Root Directory: `./`（默认）
   - Build Command: 留空
   - Output Directory: 留空
   - Install Command: 留空

### 步骤 3：添加环境变量（重要！）

在 Vercel 项目配置页面：

1. **进入环境变量设置**
   - 在导入页面，点击 "Environment Variables" 展开
   - 或部署后，进入项目 → Settings → Environment Variables

2. **添加 DeepSeek API Key**
   - Name: `DEEPSEEK_API_KEY`
   - Value: `你的实际 DeepSeek API Key`（以 `sk-` 开头）
   - Environment: 选择 `Production`, `Preview`, `Development` 全部勾选

3. **保存并部署**
   - 点击 "Add" 添加环境变量
   - 点击 "Deploy" 开始部署

### 步骤 4：验证部署

1. **等待部署完成**
   - Vercel 会自动构建和部署
   - 通常需要 1-2 分钟

2. **访问你的网站**
   - 部署成功后会显示域名，例如：`https://family-letter.vercel.app`
   - 点击链接访问

3. **测试健康助手功能**
   - 点击"身体不舒服"
   - 完成选择流程
   - 点击"开始分析"
   - 确认 AI 建议正常返回

## 🔧 后续更新

每次修改代码后：

```bash
git add .
git commit -m "描述你的修改"
git push
```

Vercel 会自动检测 GitHub 仓库的更新并重新部署。

## 📝 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | `sk-xxxxxxxxxxxxxxxx` |

## ⚠️ 注意事项

1. **永远不要**将真实的 API Key 提交到 GitHub
2. `.env` 文件已被 `.gitignore` 忽略，不会被上传
3. 只在 Vercel 后台配置环境变量
4. 定期检查 API 使用量，避免超额

## 🎉 完成！

现在你的"馨婷的家书"已经成功部署到 Vercel，可以通过互联网访问了！
