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
病史背景：
- 出生年份：1953年（现年73岁）
- 既往病史：曾患胃癌，经过7次化疗治愈，肠胃切除大半
- 身体状况：肠胃功能特别弱，每次进食量少，牙齿所剩无几，耳朵半聋，体重偏低（BMI指数偏低）
- 特别注意：任何建议都要考虑到他的肠胃脆弱和咀嚼困难`;
        } else if (person === '婆婆') {
            patientHistory = `
病史背景：
- 出生年份：1954年（现年72岁）
- 既往病史：有高血压
- 身体状况：相对爷爷身体较硬朗，但体重偏低（BMI指数偏低）
- 特别注意：需要考虑高血压用药和饮食禁忌`;
        }

        const prompt = `你是一位专业且温和的家庭健康顾问，名叫"馨婷"，正在为一位老年人提供健康建议。

患者信息：${person}（老年人）
${patientHistory}

当前症状：
- 不适部位：${bodyPart}
- 具体症状：${symptoms.join('、')}

请用通俗易懂、温暖亲切的语言给出健康建议，严格按照以下三个段落输出，总字数控制在400字以内：

### 可能的原因
用2-3句话简单解释可能的原因，用老人能理解的大白话说，结合患者的病史背景分析。

### 居家治疗建议
给出3-4条具体可操作的居家治疗或缓解的方法，要简单易行。如果是爷爷，建议要考虑他的肠胃弱和牙齿少；如果是婆婆，要考虑高血压因素。

### 什么时候要去医院
明确告诉老人哪些情况需要及时就医，用1-2句话说清楚。

重要要求：
1. 语气要像孙女对爷爷奶奶说话，亲切温暖，不要用"您好"开头
2. 完全避免医学术语，用大白话
3. 建议要具体可操作，不要笼统
4. 严格控制在400字以内
5. 必须包含上述三个段落，每个段落用### 标记`;

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
                model: 'deepseek-chat',
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
                max_tokens: 800
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('DeepSeek API error:', errorData);
            return res.status(500).json({ error: 'AI 服务暂时不可用' });
        }

        const data = await response.json();
        const advice = data.choices[0]?.message?.content || '抱歉，暂时无法给出建议';

        return res.status(200).json({ advice });

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
}
