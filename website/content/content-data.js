// 南風內容中心 - 數據
const contentDB = {
    articles: [
        {
            id: 1,
            title: '如何識別自己的情緒：給香港上班族的情緒管理指南',
            excerpt: '在快節奏的香港，學會識別和管理情緒是維持心理健康的第一步。本文介紹五種實用的情緒識別技巧...',
            category: '情緒管理',
            author: '王美琪',
            authorTitle: '註冊社工',
            date: '2026-03-18',
            readTime: '5分鐘',
            image: '🧘‍♀️',
            views: 1234,
            likes: 89,
            featured: true,
            tags: ['情緒識別', '壓力管理', '上班族']
        },
        {
            id: 2,
            title: '遠程工作時的孤獨感：如何建立健康的社交連結',
            excerpt: '在家工作成為新常態，但孤獨感也隨之增加。這裡有幾個方法幫助你在遠程工作中保持社交健康...',
            category: '職場心理',
            author: '陳雅婷',
            authorTitle: '臨床心理學家',
            date: '2026-03-17',
            readTime: '4分鐘',
            image: '🏠',
            views: 987,
            likes: 67,
            featured: false,
            tags: ['遠程工作', '孤獨感', '社交']
        },
        {
            id: 3,
            title: '改善睡眠質量的10個科學方法',
            excerpt: '睡眠質量直接影響心理健康。從認知行為療法的角度，分享改善失眠的實用技巧...',
            category: '身心健康',
            author: '李志偉',
            authorTitle: '輔導心理學家',
            date: '2026-03-15',
            readTime: '6分鐘',
            image: '😴',
            views: 2345,
            likes: 156,
            featured: true,
            tags: ['睡眠', '失眠', 'CBT']
        },
        {
            id: 4,
            title: '伴侶溝通的四個陷阱與解決方案',
            excerpt: '在親密關係中，溝通方式的差異往往是衝突的根源。了解這四個常見陷阱，學習更有效的溝通技巧...',
            category: '關係修復',
            author: '張慧敏',
            authorTitle: '婚姻與家庭治療師',
            date: '2026-03-14',
            readTime: '5分鐘',
            image: '💑',
            views: 876,
            likes: 54,
            featured: false,
            tags: ['伴侶溝通', '親密關係', '衝突解決']
        },
        {
            id: 5,
            title: '家長必讀：如何識別青少年的心理健康警號',
            excerpt: '青少年時期是心理發展的關鍵階段。家長了解這些警號，能及早發現問題並提供支持...',
            category: '親子教育',
            author: '劉志豪',
            authorTitle: '學校心理學家',
            date: '2026-03-12',
            readTime: '7分鐘',
            image: '👨‍👩‍👧',
            views: 1567,
            likes: 98,
            featured: true,
            tags: ['青少年', '家長指南', '心理健康']
        },
        {
            id: 6,
            title: '正念冥想入門：每天10分鐘改變你的生活',
            excerpt: '正念冥想已被科學證實能減輕壓力和焦慮。這篇入門指南幫助你開始練習...',
            category: '自我成長',
            author: '陳雅婷',
            authorTitle: '臨床心理學家',
            date: '2026-03-10',
            readTime: '4分鐘',
            image: '🧘',
            views: 1123,
            likes: 76,
            featured: false,
            tags: ['正念', '冥想', '減壓']
        }
    ],
    
    audio: [
        {
            id: 1,
            title: '睡前放鬆引導',
            desc: '15分鐘睡前冥想，幫助你放鬆身心，進入深度睡眠',
            duration: '15:00',
            plays: 5678,
            icon: '🌙'
        },
        {
            id: 2,
            title: '焦慮緩解練習',
            desc: '當焦慮來襲時，跟著這個練習平靜下來',
            duration: '10:00',
            plays: 3456,
            icon: '😌'
        },
        {
            id: 3,
            title: '正念呼吸入門',
            desc: '適合初學者的正念呼吸引導',
            duration: '8:00',
            plays: 2890,
            icon: '🌬️'
        }
    ],
    
    videos: [
        {
            id: 1,
            title: '情緒急救：當恐慌發作時該怎麼辦',
            thumbnail: '🎬',
            duration: '12:34',
            views: 2345
        },
        {
            id: 2,
            title: '如何與孩子談論心理健康',
            thumbnail: '🎥',
            duration: '18:20',
            views: 1876
        }
    ],
    
    categories: ['全部', '情緒管理', '職場心理', '身心健康', '關係修復', '親子教育', '自我成長'],
    
    tags: ['熱門', '推薦', '新上架', '精選']
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = contentDB;
}
