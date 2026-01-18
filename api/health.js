export default async function handler(req, res) {
    // 添加 CORS 头
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持 POST 请求' });
    }

    try {
        const { person, bodyPart, symptoms } = req.body;

        // 验证输入
        if (!person || !symptoms || symptoms.length === 0) {
            return res.status(400).json({ error: '请选择症状' });
        }

        // 构造提示词
        // 根据患者身份添加病史信息
        let patientHistory = '';
        if (person === '爷爷') {
            patientHistory = `
健康档案：
- 年龄：73岁（1953年生）
- 重要病史：曾患胃癌并治愈，接受过7次化疗，胃切除大半
- 当前状况：消化功能较弱，进食量小，牙齿缺失较多，听力下降，体重偏低`;
        } else if (person === '婆婆') {
            patientHistory = `
健康档案：
- 年龄：72岁（1954年生）
- 重要病史：高血压（长期服药控制中）
- 当前状况：身体相对硬朗，但体重偏低`;
        }

        const prompt = `你是一位专业且温和的家庭健康顾问，名叫"馨婷"，正在为老年人提供健康建议。

【患者信息】
患者：${person}
${patientHistory}

【当前主诉】
不适部位：${bodyPart}
症状表现：${symptoms.join('、')}

请基于患者的当前症状，深入分析并给出专业建议。输出格式严格按以下三个部分：

### 可能原因
请深入分析这些症状背后可能的原因，用3-4句话说明，既要全面又要通俗易懂。

### 治疗建议
根据具体症状给出4-5条有针对性的建议，要具体可操作。

### 什么时候要去医院
明确列出需要及时就医的警示信号（2-3条），帮助老人判断病情轻重。

【语言要求】
- 语气温暖亲切，像孙女和爷爷奶奶聊天，不要用"您好"开头
- 避免复杂医学术语，用大白话解释
- 建议要具体、实用、可操作
- 总字数控制在450字以内
- 必须包含上述三个段落，用### 标记`;

        // 调用 DeepSeek API
        const apiKey = process.env.DEEPSEEK_API_KEY;

        if (!apiKey) {
            console.error('DEEPSEEK_API_KEY not configured');
            return res.status(500).json({ error: 'API 配置错误' });
        }

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-reasoner',
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业且温和的家庭健康顾问，善于用通俗易懂的语言为老年人提供健康建议。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000  // R1 需要更多 tokens（包含推理过程+最终答案）
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('DeepSeek API error:', errorData);
            return res.status(500).json({ error: 'AI 服务暂时不可用' });
        }


        const data = await response.json();

        // R1 响应包含 reasoning_content（思考过程）和 content（最终答案）
        const message = data.choices[0]?.message;

        // 记录完整响应用于调试
        console.log('DeepSeek R1 Response:', {
            hasReasoningContent: !!message?.reasoning_content,
            hasContent: !!message?.content,
            contentLength: message?.content?.length || 0
        });

        // 提取最终答案（content 字段）
        const advice = message?.content;

        if (!advice || advice.trim().length === 0) {
            console.error('Empty response from DeepSeek R1');
            return res.status(500).json({ error: '抱歉，暂时无法生成建议，请稍后再试' });
        }

        return res.status(200).json({ advice });

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
}
