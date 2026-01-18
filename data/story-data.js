// 馨婷的家书 - 剧情数据
// 包含所有交互式剧情分支

const storyData = {
    // ================= 主菜单 =================
    "start": {
        "text": "爷爷、婆婆，早上好呀！☀️\n\n我是你们的乖孙女<span style='color:var(--color-green-text); font-weight:bold;'>馨婷</span>。\n\n今天打开这个网页，是身体不舒服，还是想找我聊天呀？",
        "choices": [
            { "text": "🏥 身体不舒服", "target": "health_check", "action": "goToHealth", "highlight": true },
            { "text": "😄 就在家找点乐子", "target": "happy_center" },
            { "text": "💭 心里有点烦，聊聊", "target": "comfort_center" },
            { "text": "🏠 生活小助手", "target": "life_helper" }
        ]
    },

    // ================= 欢乐中心 =================
    "happy_center": {
        "text": "身体好就是最大的福气！🎉\n\n既然心情不错，馨婷给你们准备了好几个小节目，想看哪个？",
        "choices": [
            { "text": "📖 讲个笑话听听", "target": "joke_menu" },
            { "text": "🤔 出个脑筋急转弯", "target": "riddle_menu" },
            { "text": "🎵 听听经典老歌", "target": "song_menu" },
            { "text": "🔙 返回", "target": "start" }
        ]
    },

    // --- 笑话分支 ---
    "joke_menu": {
        "text": "馨婷这里有好多笑话呢！😄\n\n都是生活里的小趣事，保证让你们开心！",
        "choices": [
            { "text": "老两口的趣事", "target": "joke_1" },
            { "text": "手机的发明", "target": "joke_2" },
            { "text": "买菜的故事", "target": "joke_3" },
            { "text": "看电视的对话", "target": "joke_4" },
            { "text": "🔙 返回", "target": "happy_center" }
        ]
    },
    "joke_1": {
        "text": "讲个老两口的事儿：\n\n老头子对老太婆说：'我这记性越来越差了，刚才想去厨房，走到门口忘了要干啥。'\n\n老太婆说：'你这算啥，刚才我刚想找你要钱，话到嘴边...哎？我找你要啥来着？'\n\n老头子赶紧掏出十块钱：'给给给，别想起来！' 😂",
        "choices": [
            { "text": "哈哈，这老头精明！", "target": "joke_end", "highlight": true },
            { "text": "再来一个！", "target": "joke_menu" }
        ]
    },
    "joke_2": {
        "text": "小孙子问爷爷：'爷爷，现在的手机真高级，那是谁发明的？'\n\n爷爷想了想说：'肯定是怕老婆的人发明的！因为无论走到哪，老婆一个电话就能找到他！' 📱",
        "choices": [
            { "text": "有道理！哈哈！", "target": "joke_end", "highlight": true },
            { "text": "再来一个！", "target": "joke_menu" }
        ]
    },
    "joke_3": {
        "text": "老太太去买菜，摊主说：'这青菜5块一斤。'\n\n老太太：'昨天才3块！'\n\n摊主：'大娘，现在涨价了。'\n\n老太太：'那我买昨天的！' 🥬\n\n摊主哭笑不得：'大娘，昨天的早卖完了！'",
        "choices": [
            { "text": "这老太太真逗！", "target": "joke_end", "highlight": true },
            { "text": "再来一个！", "target": "joke_menu" }
        ]
    },
    "joke_4": {
        "text": "老两口看电视：\n\n老头子：'这演员演得真好，跟真的一样！'\n\n老太婆：'那当然，人家是专业的。'\n\n老头子：'我说的是广告里那个卖药的，说得我都想买了！'\n\n老太婆：'你可别信，咱家药都堆成山了！' 📺",
        "choices": [
            { "text": "说得对，别乱买药！", "target": "joke_end", "highlight": true },
            { "text": "再来一个！", "target": "joke_menu" }
        ]
    },
    "joke_end": {
        "text": "笑一笑，十年少！😊\n\n爷爷奶奶，你们开心大笑的样子，是馨婷最想看到的画面！",
        "choices": [
            { "text": "开心了，谢谢乖孙女", "target": "start", "highlight": true },
            { "text": "再听几个笑话", "target": "joke_menu" }
        ]
    },

    // --- 脑筋急转弯分支 ---
    "riddle_menu": {
        "text": "来动动脑筋吧！🧠\n\n这些谜题都不难，爷爷奶奶肯定能猜出来！",
        "choices": [
            { "text": "第一题：越洗越脏", "target": "riddle_1" },
            { "text": "第二题：不吃饭", "target": "riddle_2" },
            { "text": "第三题：有嘴不说话", "target": "riddle_3" },
            { "text": "🔙 返回", "target": "happy_center" }
        ]
    },
    "riddle_1": {
        "text": "考考爷爷奶奶的脑筋：\n\n什么东西，越洗越脏？🤔\n\n(猜一日常用品)",
        "choices": [
            { "text": "水！", "target": "riddle_1_right" },
            { "text": "衣服？", "target": "riddle_1_wrong" }
        ]
    },
    "riddle_1_right": {
        "text": "猜对啦！真聪明！👍\n\n就是洗碗洗桌子的水，水越洗越脏嘛！",
        "choices": [
            { "text": "这难不倒我", "target": "riddle_end", "highlight": true },
            { "text": "再来一题", "target": "riddle_menu" }
        ]
    },
    "riddle_1_wrong": {
        "text": "不对哦，衣服是越洗越干净呀！\n\n答案是——<span style='color:var(--color-green-text)'>水</span>！洗东西的水是不是越洗越脏？😄",
        "choices": [
            { "text": "哎呀，被绕进去了", "target": "riddle_end" },
            { "text": "再来一题", "target": "riddle_menu" }
        ]
    },
    "riddle_2": {
        "text": "再来一题：\n\n什么东西天天吃饭，却永远吃不饱？🍚\n\n(猜一个厨房用品)",
        "choices": [
            { "text": "锅！", "target": "riddle_2_right" },
            { "text": "筷子？", "target": "riddle_2_wrong" }
        ]
    },
    "riddle_2_right": {
        "text": "答对了！👏\n\n锅天天煮饭，但永远吃不饱，因为饭都被咱们吃了！",
        "choices": [
            { "text": "原来如此！", "target": "riddle_end", "highlight": true },
            { "text": "再来一题", "target": "riddle_menu" }
        ]
    },
    "riddle_2_wrong": {
        "text": "不对哦！\n\n答案是<span style='color:var(--color-green-text)'>锅</span>！锅天天煮饭，但永远吃不饱，因为饭都被咱们吃了！😄",
        "choices": [
            { "text": "有意思！", "target": "riddle_end" },
            { "text": "再来一题", "target": "riddle_menu" }
        ]
    },
    "riddle_3": {
        "text": "最后一题：\n\n什么东西有嘴不说话，有脚不走路？🤐\n\n(猜一个家具)",
        "choices": [
            { "text": "桌子！", "target": "riddle_3_right" },
            { "text": "椅子？", "target": "riddle_3_wrong" }
        ]
    },
    "riddle_3_right": {
        "text": "太厉害了！全答对了！🎉\n\n桌子有桌脚，也叫桌子嘴（边缘），但不会说话也不会走路！",
        "choices": [
            { "text": "这些都难不倒我", "target": "riddle_end", "highlight": true }
        ]
    },
    "riddle_3_wrong": {
        "text": "差一点！\n\n答案是<span style='color:var(--color-green-text)'>桌子</span>！桌子有桌脚，也叫桌子嘴（边缘），但不会说话也不会走路！",
        "choices": [
            { "text": "学到了！", "target": "riddle_end" }
        ]
    },
    "riddle_end": {
        "text": "动动脑筋，活到九十九！🧠\n\n经常做做这些小游戏，对大脑特别好哦！",
        "choices": [
            { "text": "好的，记住了", "target": "start", "highlight": true },
            { "text": "再猜几个谜语", "target": "riddle_menu" }
        ]
    },

    // --- 经典歌曲分支 ---
    "song_menu": {
        "text": "馨婷给你们准备了几首经典老歌！🎵\n\n都是你们那个年代最流行的歌，听听能不能想起当年的美好时光？",
        "choices": [
            { "text": "《在那桃花盛开的地方》", "target": "song_1" },
            { "text": "《我的祖国》", "target": "song_2" },
            { "text": "《敢问路在何方》", "target": "song_3" },
            { "text": "🔙 返回", "target": "happy_center" }
        ]
    },
    "song_1": {
        "text": "🎵 《在那桃花盛开的地方》\n\n在那桃花盛开的地方\n有我可爱的故乡\n桃树倒映在明净的水面\n桃林环抱着秀丽的村庄\n\n这首歌是不是勾起了很多回忆？🌸",
        "choices": [
            { "text": "想起年轻时候了", "target": "song_end", "highlight": true },
            { "text": "再听一首", "target": "song_menu" }
        ]
    },
    "song_2": {
        "text": "🎵 《我的祖国》\n\n一条大河波浪宽\n风吹稻花香两岸\n我家就在岸上住\n听惯了艄公的号子\n看惯了船上的白帆\n\n这首歌承载了多少人的记忆！🇨🇳",
        "choices": [
            { "text": "这歌真好听", "target": "song_end", "highlight": true },
            { "text": "再听一首", "target": "song_menu" }
        ]
    },
    "song_3": {
        "text": "🎵 《敢问路在何方》\n\n你挑着担，我牵着马\n迎来日出送走晚霞\n踏平坎坷成大道\n斗罢艰险又出发\n\n西游记的主题曲，百听不厌！🐵",
        "choices": [
            { "text": "经典永流传", "target": "song_end", "highlight": true },
            { "text": "再听一首", "target": "song_menu" }
        ]
    },
    "song_end": {
        "text": "美好的回忆永远珍藏在心里！💝\n\n这些歌陪伴了你们的青春岁月，现在听起来是不是特别亲切？",
        "choices": [
            { "text": "是啊，谢谢馨婷", "target": "start", "highlight": true },
            { "text": "再听几首老歌", "target": "song_menu" }
        ]
    },

    // ================= 暖心鸡汤 =================
    "comfort_center": {
        "text": "我知道，有时候年纪大了，总会有些操心事。\n\n是因为家里的琐事烦心，还是担心我们这些小辈呀？",
        "choices": [
            { "text": "担心你们在外过得不好", "target": "comfort_kids" },
            { "text": "觉得自己老了没用", "target": "comfort_old" },
            { "text": "就是莫名其妙心烦", "target": "comfort_general" },
            { "text": "想听听养生建议", "target": "comfort_health" },
            { "text": "🔙 返回", "target": "start" }
        ]
    },
    "comfort_kids": {
        "text": "爷爷奶奶，俗话说'儿孙自有儿孙福'。🌱\n\n我们在外面能吃能睡，还有这么厉害的电脑技术，过得好着呢！\n\n你们把自己照顾得白白胖胖的，我们在外面打拼才没有后顾之忧呀！",
        "choices": [
            { "text": "说得对，我不瞎操心", "target": "comfort_end", "highlight": true },
            { "text": "还想聊聊其他的", "target": "comfort_center" }
        ]
    },
    "comfort_old": {
        "text": "千万别这么想！🚫\n\n家有一老，如有一宝。你们坐在家里，咱们这个家才有个'根'。\n\n你们只要健健康康地坐那儿看电视，就是对全家最大的贡献！",
        "choices": [
            { "text": "心里舒坦多了", "target": "comfort_end", "highlight": true },
            { "text": "还想聊聊其他的", "target": "comfort_center" }
        ]
    },
    "comfort_general": {
        "text": "莫生气，莫生气，人生就像一场戏。🍵\n\n烦恼的时候，就看向窗外，晒晒太阳。\n\n馨婷告诉你们一个秘密：<span style='color:var(--color-green-text)'>'开心才是第一要务'</span>，其他都是浮云！",
        "choices": [
            { "text": "听馨婷的，不想了", "target": "comfort_end", "highlight": true },
            { "text": "还想聊聊其他的", "target": "comfort_center" }
        ]
    },
    "comfort_health": {
        "text": "养生其实很简单！🌿\n\n记住这几点：\n\n1️⃣ 早睡早起，晚上10点前睡觉\n2️⃣ 饭吃七分饱，细嚼慢咽\n3️⃣ 每天散散步，活动筋骨\n4️⃣ 心情要舒畅，少生气\n\n这些都做到了，身体自然好！",
        "choices": [
            { "text": "记住了，谢谢馨婷", "target": "comfort_end", "highlight": true },
            { "text": "还想聊聊其他的", "target": "comfort_center" }
        ]
    },
    "comfort_end": {
        "text": "这就对啦！❤️\n\n把心放宽，今晚睡个好觉。\n\n要是还烦，就点这个网页，馨婷随时陪你们聊天！",
        "choices": [
            { "text": "好的，回主菜单", "target": "start" }
        ]
    },

    // ================= 生活小助手 =================
    "life_helper": {
        "text": "馨婷这里有很多生活小知识！🏠\n\n都是实用的小窍门，学会了生活更方便哦！",
        "choices": [
            { "text": "🌤️ 天气提醒", "target": "weather_tips" },
            { "text": "🍂 节气知识", "target": "solar_terms" },
            { "text": "💡 生活小窍门", "target": "life_hacks" },
            { "text": "🛡️ 安全提醒", "target": "safety_tips" },
            { "text": "🔙 返回", "target": "start" }
        ]
    },

    // --- 天气提醒 ---
    "weather_tips": {
        "text": "关心天气，关心健康！🌤️\n\n馨婷给你们几个温馨提示：\n\n☀️ 晴天：早晚温差大，记得添衣\n🌧️ 雨天：出门带伞，地滑小心\n❄️ 降温：多穿点，别感冒\n🌡️ 高温：多喝水，少出门\n\n天气变化要注意哦！",
        "choices": [
            { "text": "知道了，会注意", "target": "life_helper", "highlight": true },
            { "text": "回主菜单", "target": "start" }
        ]
    },

    // --- 节气知识 ---
    "solar_terms": {
        "text": "二十四节气是老祖宗的智慧！🍂\n\n现在给你们讲几个重要的：\n\n🌸 立春：万物复苏，多吃韭菜\n☀️ 夏至：一年最热，防暑降温\n🍁 秋分：昼夜平分，贴秋膘\n❄️ 冬至：吃饺子，进补好时节\n\n顺应节气，身体更健康！",
        "choices": [
            { "text": "老祖宗真有智慧", "target": "life_helper", "highlight": true },
            { "text": "回主菜单", "target": "start" }
        ]
    },

    // --- 生活小窍门 ---
    "life_hacks": {
        "text": "馨婷教你们几个生活小窍门！💡\n\n1️⃣ 牙膏能去茶渍：杯子有茶渍，用牙膏擦一擦就干净了\n\n2️⃣ 盐水泡蔬菜：青菜用盐水泡10分钟，虫子自己就出来了\n\n3️⃣ 醋除水垢：烧水壶有水垢，倒点醋烧开就没了\n\n都是简单又实用的小方法！",
        "choices": [
            { "text": "这些方法真好", "target": "life_helper", "highlight": true },
            { "text": "回主菜单", "target": "start" }
        ]
    },

    // --- 安全提醒 ---
    "safety_tips": {
        "text": "安全最重要！🛡️\n\n馨婷提醒你们几点：\n\n📞 陌生电话别信：说中奖、退税的都是骗子\n💰 不要随便转账：家人要钱先打电话确认\n🔥 用电要小心：人走断电，别超负荷\n🚪 出门锁好门：贵重物品藏好\n\n安全无小事，一定要记住！",
        "choices": [
            { "text": "记住了，谢谢提醒", "target": "life_helper", "highlight": true },
            { "text": "回主菜单", "target": "start" }
        ]
    }
};

// 导出数据（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
}

