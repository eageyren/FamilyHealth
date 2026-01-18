# 🔧 API 调用问题完整修复指南

## 问题分析

你已经在 Vercel 添加了环境变量 `DEEPSEEK_API_KEY`，但 API 调用仍然失败。

### 可能的原因：

1. ✅ **Vercel 配置问题**：使用了旧版配置格式
2. ⚠️ **环境变量作用域**：可能只在某个环境生效
3. ⚠️ **CORS 问题**：跨域请求被阻止
4. ⚠️ **API Key 格式**：请确认 API Key 是否正确

## ✅ 已完成的修复

### 1. 更新 `vercel.json`

**修改前**（使用废弃的 v2 配置）：
```json
{
    "version": 2,
    "builds": [...],
    "routes": [...]
}
```

**修改后**（使用现代配置）：
```json
{
    "rewrites": [
        {
            "source": "/api/(.*)",
            "destination": "/api/$1"
        }
    ]
}
```

### 2. 添加 CORS 头到 `api/health.js`

```javascript
export default async function handler(req, res) {
    // 添加 CORS 头
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    
    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // ... 其余代码
}
```

## 🚨 重要：检查环境变量配置

### 在 Vercel 后台确认

1. 进入你的项目 → **Settings** → **Environment Variables**

2. 确认 `DEEPSEEK_API_KEY` 的配置：

   **Name**: `DEEPSEEK_API_KEY`
   
   **Value**: `sk-86b540497886410d8ccc2a0a6961e952`
   
   **Environment** (必须勾选所有三个)：
   - ✅ **Production**
   - ✅ **Preview**  
   - ✅ **Development**

3. **如果只勾选了一个环境**，需要重新设置：
   - 点击环境变量旁边的 **...** 菜单
   - 选择 **Edit**
   - 勾选所有三个环境
   - 点击 **Save**

## 📝 部署步骤

### 步骤 1：提交代码修改

```bash
cd e:\AllDemo\Family

# 查看修改
git status

# 添加修改的文件
git add vercel.json api/health.js API_FIX.md

# 提交
git commit -m "Fix: 修复 API 调用 - 更新 Vercel 配置并添加 CORS 头"

# 推送
git push
```

### 步骤 2：等待 Vercel 自动部署

- Vercel 检测到代码更新后会自动重新部署
- 等待 1-2 分钟

### 步骤 3：验证修复

1. 访问你的 Vercel 网站
2. 点击"身体不舒服"
3. 完成选择流程
4. 点击"开始分析"
5. **如果成功**：应该看到 AI 生成的健康建议
6. **如果失败**：打开浏览器开发者工具查看错误

## 🔍 调试方法

### 在浏览器查看详细错误

1. **打开部署后的网页**
2. **按 F12** 打开开发者工具
3. **转到 Console 选项卡**
4. **转到 Network 选项卡**
5. **尝试使用健康助手功能**
6. **查看 `/api/health` 请求**：
   - 点击该请求查看详情
   - 查看 **Status**: 应该是 200
   - 查看 **Response**: 查看返回的内容

### 常见错误码和解决方法

| 状态码 | 错误信息 | 可能原因 | 解决方法 |
|--------|----------|----------|----------|
| **404** | Not Found | API 路由未找到 | 检查 URL 是否为 `/api/health` |
| **500** | API 配置错误 | 环境变量未设置 | 在 Vercel 后台重新添加并勾选所有环境 |
| **500** | DeepSeek API error | API Key 无效或额度用完 | 检查 API Key 是否正确 |
| **405** | Method Not Allowed | 请求方法错误 | 应该使用 POST，检查前端代码 |
| **CORS Error** | 跨域错误 | CORS 头未设置 | 已在代码中添加 |

## ⚠️ API Key 安全提醒

**重要**：虽然你刚才在描述中提到了 API Key，但请记住：

1. ✅ **永远不要在代码中硬编码 API Key**
2. ✅ **只在 Vercel 环境变量中配置**
3. ⚠️ **建议定期轮换 API Key**
4. ⚠️ **监控 API 使用量，设置额度警告**

如果你担心 API Key 已泄露，建议：
- 登录 DeepSeek 平台
- 删除当前 API Key
- 生成新的 API Key
- 在 Vercel 中更新环境变量

## 🎯 验证成功的标志

API 调用成功后，你应该看到：

1. ✅ 点击"开始分析"后出现加载动画
2. ✅ 几秒钟后显示健康建议
3. ✅ 建议内容包含三个部分：
   - 可能的原因
   - 居家治疗建议
   - 什么时候要去医院
4. ✅ 语音播报功能正常（如果开启）

## 🆘 如果仍然失败

请执行以下操作并告诉我结果：

1. **在浏览器控制台截图错误信息**
2. **在 Network 选项卡中查看 `/api/health` 的响应**
3. **在 Vercel 部署日志中查看是否有错误**

我会根据具体错误信息继续帮你解决！
