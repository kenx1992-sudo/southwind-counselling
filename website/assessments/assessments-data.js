// 南風心理測評系統 - 數據庫
const assessmentsDB = {
    phq9: {
        id: 'phq9',
        title: 'PHQ-9 抑鬱症篩查量表',
        subtitle: 'Patient Health Questionnaire-9',
        description: 'PHQ-9 是國際通用的抑鬱症篩查工具，共有9條目，用於評估過去兩週內的抑鬱症狀嚴重程度。',
        duration: '3-5分鐘',
        questions: 9,
        category: '情緒健康',
        icon: '😔',
        color: '#3B82F6',
        instructions: '請根據過去兩週（包括今天）的感受，選擇最符合你的選項。',
        items: [
            {
                id: 1,
                text: '做事時提不起勁或沒有樂趣',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 2,
                text: '感到心情低落、沮喪或絕望',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 3,
                text: '入睡困難、睡不安穩或睡眠過多',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 4,
                text: '感覺疲倦或沒有活力',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 5,
                text: '食慾不振或吃太多',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 6,
                text: '覺得自己很糟、很失敗，或讓自己或家人失望',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 7,
                text: '對事物專注有困難，例如閱讀報紙或看電視',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 8,
                text: '動作或說話速度緩慢到別人已經察覺，或正好相反——煩躁或坐立不安、動來動去的情況比平常更嚴重',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            },
            {
                id: 9,
                text: '有不如死掉或用某種方式傷害自己的念頭',
                options: [
                    { value: 0, text: '完全沒有', desc: '少於1天' },
                    { value: 1, text: '幾天', desc: '1-7天' },
                    { value: 2, text: '一半以上天數', desc: '8-12天' },
                    { value: 3, text: '幾乎每天', desc: '13-14天' }
                ]
            }
        ],
        scoring: {
            ranges: [
                { min: 0, max: 4, level: '無或極輕微抑鬱', color: '#22C55E', desc: '你的情緒狀態良好，建議保持現有的生活習慣。', suggestion: '繼續保持規律作息、適度運動和社交活動。' },
                { min: 5, max: 9, level: '輕度抑鬱', color: '#F59E0B', desc: '你可能有輕度的抑鬱症狀，建議關注情緒變化。', suggestion: '建議與信任的朋友或家人傾訴，考慮進行心理諮詢。' },
                { min: 10, max: 14, level: '中度抑鬱', color: '#F97316', desc: '你的抑鬱症狀達到中度水平，建議尋求專業幫助。', suggestion: '強烈建議預約專業心理諮詢，南風輔導員隨時為你服務。' },
                { min: 15, max: 19, level: '中重度抑鬱', color: '#EF4444', desc: '你的抑鬱症狀較為嚴重，需要專業介入。', suggestion: '請盡快預約專業心理輔導，必要時尋求精神科醫生協助。' },
                { min: 20, max: 27, level: '重度抑鬱', color: '#DC2626', desc: '你的抑鬱症狀嚴重，需要立即尋求專業幫助。', suggestion: '請立即聯繫專業心理輔導或醫療機構，你並不孤單。' }
            ]
        },
        disclaimer: '本測評僅供參考，不能替代專業醫療診斷。如症狀持續或影響日常生活，請及時尋求專業幫助。'
    },
    gad7: {
        id: 'gad7',
        title: 'GAD-7 廣泛性焦慮症篩查量表',
        subtitle: 'Generalized Anxiety Disorder-7',
        description: 'GAD-7 是篩查和評估焦慮症狀嚴重程度的有效工具，共有7條目。',
        duration: '2-3分鐘',
        questions: 7,
        category: '情緒健康',
        icon: '😰',
        color: '#8B5CF6',
        instructions: '請根據過去兩週（包括今天）的感受，選擇最符合你的選項。',
        items: [
            { id: 1, text: '感到緊張、焦慮或煩躁', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 2, text: '不能停止或控制擔憂', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 3, text: '對各種事情擔憂過多', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 4, text: '很難放鬆下來', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 5, text: '煩躁不安，坐立不安', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 6, text: '變得容易煩躁或易怒', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] },
            { id: 7, text: '感到害怕，好像有可怕的事情要發生', options: [{ value: 0, text: '完全沒有' }, { value: 1, text: '幾天' }, { value: 2, text: '一半以上天數' }, { value: 3, text: '幾乎每天' }] }
        ],
        scoring: {
            ranges: [
                { min: 0, max: 4, level: '無或極輕微焦慮', color: '#22C55E', desc: '你的焦慮水平正常。', suggestion: '繼續保持現有的放鬆習慣。' },
                { min: 5, max: 9, level: '輕度焦慮', color: '#F59E0B', desc: '有輕度焦慮症狀。', suggestion: '嘗試深呼吸、冥想等放鬆技巧。' },
                { min: 10, max: 14, level: '中度焦慮', color: '#F97316', desc: '焦慮症狀影響日常生活。', suggestion: '建議預約心理諮詢，學習應對技巧。' },
                { min: 15, max: 21, level: '重度焦慮', color: '#EF4444', desc: '焦慮症狀嚴重，需要專業幫助。', suggestion: '請盡快尋求專業心理輔導。' }
            ]
        },
        disclaimer: '本測評僅供參考，不能替代專業醫療診斷。'
    },
    burnout: {
        id: 'burnout',
        title: '職業倦怠量表',
        subtitle: 'Maslach Burnout Inventory 簡版',
        description: '評估你的職業倦怠程度，了解是否需要調整工作節奏。',
        duration: '3-4分鐘',
        questions: 9,
        category: '職場健康',
        icon: '💼',
        color: '#F59E0B',
        instructions: '請根據你目前的工作狀態，選擇最符合你的感受。',
        items: [
            { id: 1, text: '工作讓我感到身心俱疲', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 2, text: '下班後我感覺被工作掏空', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 3, text: '早晨起床想到工作就覺得累', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 4, text: '我對工作失去了熱情', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 5, text: '我對工作結果不太在意了', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 6, text: '我覺得自己的工作沒有價值', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 7, text: '我對同事和客戶越來越沒有耐心', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 8, text: '我開始懷疑工作的意義', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] },
            { id: 9, text: '我覺得自己無法應對工作的要求', options: [{ value: 0, text: '從不' }, { value: 1, text: '偶爾' }, { value: 2, text: '經常' }, { value: 3, text: '總是' }] }
        ],
        scoring: {
            ranges: [
                { min: 0, max: 9, level: '狀態良好', color: '#22C55E', desc: '你的工作狀態健康。', suggestion: '繼續保持工作與生活的平衡。' },
                { min: 10, max: 18, level: '輕度倦怠', color: '#F59E0B', desc: '需要注意工作壓力。', suggestion: '適當休息，培養工作以外的興趣。' },
                { min: 19, max: 27, level: '中度倦怠', color: '#F97316', desc: '職業倦怠明顯，需要調整。', suggestion: '建議與上司溝通或尋求職業輔導。' }
            ]
        },
        disclaimer: '本測評僅供參考，用於自我評估。'
    },
    attachment: {
        id: 'attachment',
        title: '依戀風格測試',
        subtitle: 'Adult Attachment Style',
        description: '了解你的親密關係模式，改善人際互動。',
        duration: '5-8分鐘',
        questions: 18,
        category: '人際關係',
        icon: '💕',
        color: '#EC4899',
        instructions: '請根據你在親密關係中的感受選擇最符合的選項。',
        items: [
            { id: 1, text: '我發現與人親近很容易', options: [{ value: 1, text: '非常同意' }, { value: 2, text: '同意' }, { value: 3, text: '不同意' }, { value: 4, text: '非常不同意' }] },
            { id: 2, text: '我想親近他人時會感到不舒服', options: [{ value: 4, text: '非常同意' }, { value: 3, text: '同意' }, { value: 2, text: '不同意' }, { value: 1, text: '非常不同意' }] },
            { id: 3, text: '我擔心被拋棄', options: [{ value: 4, text: '非常同意' }, { value: 3, text: '同意' }, { value: 2, text: '不同意' }, { value: 1, text: '非常不同意' }] },
            { id: 4, text: '我發現他人不想像我想要的那樣親近', options: [{ value: 4, text: '非常同意' }, { value: 3, text: '同意' }, { value: 2, text: '不同意' }, { value: 1, text: '非常不同意' }] },
            { id: 5, text: '我對親近感到相對舒適', options: [{ value: 1, text: '非常同意' }, { value: 2, text: '同意' }, { value: 3, text: '不同意' }, { value: 4, text: '非常不同意' }] },
            { id: 6, text: '我擔心沒有人愛我', options: [{ value: 4, text: '非常同意' }, { value: 3, text: '同意' }, { value: 2, text: '不同意' }, { value: 1, text: '非常不同意' }] }
            // 簡化版本，實際應有18題
        ],
        scoring: {
            // 依戀風格計分較複雜，這裡簡化
            ranges: [
                { min: 0, max: 25, level: '安全型依戀', color: '#22C55E', desc: '你對親密關係感到舒適自在。', suggestion: '保持開放的溝通，繼續建立健康的關係。' },
                { min: 26, max: 50, level: '焦慮型依戀', color: '#F59E0B', desc: '你渴望親密但擔心被拋棄。', suggestion: '學習建立安全感，減少過度依賴。' },
                { min: 51, max: 72, level: '迴避型依戀', color: '#3B82F6', desc: '你習慣保持情感距離。', suggestion: '嘗試慢慢敞開心扉，允許自己脆弱。' }
            ]
        },
        disclaimer: '本測評僅供參考。'
    }
};

// 測評列表數據
const assessmentsList = [
    {
        id: 'phq9',
        title: 'PHQ-9 抑鬱症篩查',
        desc: '國際通用抑鬱症狀評估工具',
        questions: 9,
        duration: '3-5分鐘',
        category: '情緒健康',
        icon: '😔',
        color: '#3B82F6',
        popular: true
    },
    {
        id: 'gad7',
        title: 'GAD-7 焦慮症篩查',
        desc: '評估焦慮症狀嚴重程度',
        questions: 7,
        duration: '2-3分鐘',
        category: '情緒健康',
        icon: '😰',
        color: '#8B5CF6',
        popular: true
    },
    {
        id: 'burnout',
        title: '職業倦怠測試',
        desc: '評估工作疲憊與耗竭程度',
        questions: 9,
        duration: '3-4分鐘',
        category: '職場健康',
        icon: '💼',
        color: '#F59E0B',
        popular: false
    },
    {
        id: 'attachment',
        title: '依戀風格測試',
        desc: '了解你的親密關係模式',
        questions: 18,
        duration: '5-8分鐘',
        category: '人際關係',
        icon: '💕',
        color: '#EC4899',
        popular: false
    }
];

// 輸出供 HTML 使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { assessmentsDB, assessmentsList };
}
