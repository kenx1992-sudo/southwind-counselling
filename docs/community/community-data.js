// 南風社區/問答系統 - 數據
const communityDB = {
    categories: [
        { id: 'emotion', name: '情緒困擾', icon: '😔', color: '#3B82F6' },
        { id: 'relationship', name: '感情關係', icon: '💕', color: '#EC4899' },
        { id: 'family', name: '家庭問題', icon: '👨‍👩‍👧‍👦', color: '#F59E0B' },
        { id: 'career', name: '職場壓力', icon: '💼', color: '#8B5CF6' },
        { id: 'growth', name: '個人成長', icon: '🌱', color: '#22C55E' },
        { id: 'study', name: '學業煩惱', icon: '📚', color: '#06B6D4' }
    ],
    
    questions: [
        {
            id: 1,
            title: '工作壓力大到每晚失眠，該怎麼辦？',
            content: '最近公司裁員，工作量倍增，每天加班到深夜。回家後腦子還在想工作的事，完全睡不著。試過熱牛奶、冥想都沒用，該怎麼辦...',
            category: 'career',
            author: '焦慮的打工人',
            avatar: '👤',
            date: '2026-03-18',
            replies: 8,
            views: 234,
            likes: 15,
            isResolved: true,
            counselorReply: {
                name: '王美琪',
                title: '註冊社工',
                content: '感謝你的分享。失眠是身體在提醒我們需要放慢腳步。建議你嘗試：1. 建立「工作結束儀式」，如洗澡後不再查看工作信息；2. 寫「煩惱日記」，睡前把擔憂寫下來；3. 考慮與上司溝通工作負荷。如果情況持續，建議尋求專業輔導。',
                likes: 42
            }
        },
        {
            id: 2,
            title: '和男朋友吵架後，他冷暴力不說話',
            content: '每次吵架他都選擇沉默，不回消息不接电话，最長試過一週。我主動求和但他還是愛理不理，這種冷暴力讓我很痛苦...',
            category: 'relationship',
            author: '困惑的女生',
            avatar: '👩',
            date: '2026-03-17',
            replies: 12,
            views: 456,
            likes: 23,
            isResolved: false,
            counselorReply: null
        },
        {
            id: 3,
            title: '父母總拿我和別人家孩子比較，很自卑',
            content: '從小到大，父母就說「你看看隔壁小明」。現在工作了，又說「人家都結婚了」。無論我怎麼努力都不夠好，感覺自己一無是處...',
            category: 'family',
            author: '永遠不夠好',
            avatar: '👤',
            date: '2026-03-16',
            replies: 15,
            views: 678,
            likes: 56,
            isResolved: true,
            counselorReply: {
                name: '陳雅婷',
                title: '臨床心理學家',
                content: '你的感受完全可以理解。父母的比較反映的是他們的焦慮，而非你的價值。建議：1. 區分「他們的期待」和「我的目標」；2. 建立自我肯定的內在標準；3. 嘗試與父母溝通你的感受。記住，你的價值不需要別人來定義。',
                likes: 89
            }
        },
        {
            id: 4,
            title: '總是控制不住的焦慮，心慌手抖',
            content: '最近經常突然心慌、手抖、呼吸困難，以為是心臟病但檢查沒問題。醫生說可能是焦慮症，我很害怕...',
            category: 'emotion',
            author: 'PanicAttack',
            avatar: '😰',
            date: '2026-03-15',
            replies: 6,
            views: 345,
            likes: 18,
            isResolved: false,
            counselorReply: null
        },
        {
            id: 5,
            title: '畢業後迷茫，不知道該往哪走',
            content: '大學畢業半年了，換了兩份工作都不適合。看同學們都找到方向了，我還在原地打轉，很迷茫...',
            category: 'growth',
            author: '迷途羔羊',
            avatar: '🐑',
            date: '2026-03-14',
            replies: 9,
            views: 567,
            likes: 34,
            isResolved: true,
            counselorReply: {
                name: '李志偉',
                title: '輔導心理學家',
                content: '畢業後的迷茫是正常的探索過程。建議：1. 興趣、能力、價值觀三圈交集分析；2. 允許自己試錯，每次工作都是排除選項；3. 與職業輔導員或資深前輩交流。人生是馬拉松，不是短跑。',
                likes: 67
            }
        },
        {
            id: 6,
            title: '研究生壓力大，想放棄學位',
            content: '實驗數據總是不對，導師也不給指導，感覺讀不下去了。但放棄又對不起父母，每天都很痛苦...',
            category: 'study',
            author: '研二迷茫中',
            avatar: '🎓',
            date: '2026-03-13',
            replies: 11,
            views: 423,
            likes: 28,
            isResolved: false,
            counselorReply: null
        }
    ],
    
    hotTags: ['失眠', '焦慮', '冷暴力', '職涯規劃', '原生家庭', '自我否定', '恐慌症', '讀研壓力'],
    
    stats: {
        totalQuestions: 1256,
        totalReplies: 3456,
        counselorsOnline: 12,
        avgResponseTime: '2小時'
    }
};

// 如果模塊導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = communityDB;
}
