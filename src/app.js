/* Upgraded Core Logic - 'src/app.js' */

// SVG Emojis Definition for unified styling
const MOOD_SVGS = {
  cool: `
    <svg viewBox="0 0 100 100" class="emoji-svg">
      <circle cx="50" cy="50" r="46" fill="var(--mood-cool)" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" fill="var(--mood-cool)"/>
      <circle cx="35" cy="40" r="4.5" fill="#fff"/>
      <circle cx="65" cy="40" r="4.5" fill="#fff"/>
      <path d="M 35 60 Q 50 78 65 60" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="35" cy="40" r="2" fill="#2d2a45"/>
      <circle cx="65" cy="40" r="2" fill="#2d2a45"/>
      <path d="M 22 28 Q 35 24 38 32" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 78 28 Q 65 24 62 32" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`,
  good: `
    <svg viewBox="0 0 100 100" class="emoji-svg">
      <circle cx="50" cy="50" r="46" fill="var(--mood-good)" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" fill="var(--mood-good)"/>
      <circle cx="34" cy="45" r="4.5" fill="#2d2a45"/>
      <circle cx="66" cy="45" r="4.5" fill="#2d2a45"/>
      <path d="M 30 58 Q 50 74 70 58" stroke="#2d2a45" stroke-width="5" stroke-linecap="round" fill="none"/>
      <ellipse cx="26" cy="54" rx="4" ry="2" fill="#ff7da0" opacity="0.6"/>
      <ellipse cx="74" cy="54" rx="4" ry="2" fill="#ff7da0" opacity="0.6"/>
    </svg>`,
  neutral: `
    <svg viewBox="0 0 100 100" class="emoji-svg">
      <circle cx="50" cy="50" r="46" fill="var(--mood-neutral)" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" fill="var(--mood-neutral)"/>
      <circle cx="34" cy="46" r="4" fill="#2d2a45"/>
      <circle cx="66" cy="46" r="4" fill="#2d2a45"/>
      <line x1="32" y1="62" x2="68" y2="62" stroke="#2d2a45" stroke-width="5" stroke-linecap="round"/>
    </svg>`,
  bad: `
    <svg viewBox="0 0 100 100" class="emoji-svg">
      <circle cx="50" cy="50" r="46" fill="var(--mood-bad)" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" fill="var(--mood-bad)"/>
      <circle cx="34" cy="48" r="4" fill="#2d2a45"/>
      <circle cx="66" cy="48" r="4" fill="#2d2a45"/>
      <path d="M 36 66 Q 50 54 64 66" stroke="#2d2a45" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 28 38 Q 35 34 38 39" stroke="#2d2a45" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M 72 38 Q 65 34 62 39" stroke="#2d2a45" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`,
  awful: `
    <svg viewBox="0 0 100 100" class="emoji-svg">
      <circle cx="50" cy="50" r="46" fill="var(--mood-awful)" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" fill="var(--mood-awful)"/>
      <path d="M 32 48 L 40 44" stroke="#2d2a45" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 68 48 L 60 44" stroke="#2d2a45" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 35 68 Q 50 55 65 68" stroke="#2d2a45" stroke-width="5.5" stroke-linecap="round" fill="none"/>
      <path d="M 30 36 Q 36 40 42 34" stroke="#2d2a45" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 70 36 Q 64 40 58 34" stroke="#2d2a45" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`
};

const MOOD_LABELS = {
  cool: '超棒',
  good: '良好',
  neutral: '沒特別',
  bad: '不佳',
  awful: '糟糕'
};

const ACTIVITY_ICONS = {
  '運動': '🏃‍♂️',
  '睡眠': '😴',
  '閱讀': '📖',
  '工作': '💼',
  '娛樂': '🎮',
  '美食': '🍕'
};

// Generates 95 days (3+ Months) of beautifully randomized diaries
function generateThreeMonthsOfDiaries() {
  const seedList = [];
  const moods = ['cool', 'good', 'neutral', 'bad', 'awful'];
  const activitiesList = [['運動', '娛樂'], ['閱讀', '美食'], ['工作'], ['睡眠', '工作'], ['美食'], ['運動', '睡眠']];
  const notes = [
    '今天放學跟同學去喝珍奶，聊到段考成績差點崩潰，還好有大家互相抱團取暖 😭。',
    '晚自習的時候偷偷看隔壁班學長，他彈吉他的樣子真的超帥，今天一天又圓滿了。',
    '段考排名出來又退步了三名，回家又要被爸媽碎碎唸，壓力大到晚餐都吃不下。',
    '今天跟死黨大吵了一架，因為她把我的祕密講出去...真的超級難過，眼淚完全停不下來 💔。',
    '下課十分鐘趴在桌上睡死，高中的課業真的多到讀不完，每天都像沒睡飽的熊貓 🐼。',
    '暑輔真的超級無聊，整堂物理課都在跟隔壁的用紙條聊天，還好沒被老師抓到 XD。',
    '體育課測跑 800 公尺差點跑斷腿，幸好最後壓線及格，晚上要去麥當勞犒賞自己！',
    '最近看著小紅書跟 Threads 上漂亮的女生，真的會有一點容貌焦慮，到底要怎麼變好看啦。',
    '今晚難得沒有失眠，十二點就躺平睡著了，希望明天早自習小考可以順利 pass。',
    '放學下暴雨，鞋子衣服全濕，還把最重要的英文講義忘在教室，今天真的爛透了 😭。'
  ];

  const today = new Date();
  for (let i = 0; i < 95; i++) {
    const curDate = new Date(today);
    curDate.setDate(today.getDate() - i);
    const dateStr = curDate.toISOString().split('T')[0];

    // skip around 13% of days (approx 3-5 days per month) to make mock data look realistic
    if (Math.random() < 0.13) {
      continue;
    }

    // Seed logic: weight normal/good slightly higher, but maintain standard bad/awful entries
    const rand = Math.random();
    let mood = 'neutral';
    if (rand < 0.2) mood = 'cool';
    else if (rand < 0.5) mood = 'good';
    else if (rand < 0.75) mood = 'neutral';
    else if (rand < 0.9) mood = 'bad';
    else mood = 'awful';

    const act = activitiesList[Math.floor(Math.random() * activitiesList.length)];
    const note = notes[Math.floor(Math.random() * notes.length)];

    seedList.push({
      id: `seed-${i}-${Date.now()}`,
      date: dateStr,
      mood,
      activities: act,
      note
    });
  }
  return seedList;
}

const DEFAULT_ARTICLES = [
  {
    id: 'a1',
    category: '容貌焦慮',
    badge: '💡 官方療癒指引',
    bigDataLabel: '📌 溫慢陪伴：段考成績與鏡子裡的自己，都是我們在成長路上正在面對的必修課。',
    title: '【專題】被段考排名與鏡中的自己逼瘋？給陷入雙重焦慮的你',
    snippet: '最近考完段考，看著退步的成績單、回到家爸媽無奈的臉色，再滑滑社群上精緻漂亮的臉孔，是不是讓你突然自卑到只想戴起口罩？來聊聊怎麼找回自我。',
    content: '<p>最近考完段考，成績單陸續發了下來。看著排名退步，回到家還要面對爸媽沉重的神色，心裡那股無力感真的很難受...</p><p>更令人無奈的是，當我們精疲力竭地躺在床上滑著 Threads 或小紅書時，滿眼都是精緻好看的臉孔、時尚的穿搭。對比鏡子裡皮膚暗沉、神色憔悴 of the self，突然一股強烈的「容貌焦慮」油然而生。很多人開始在出門時緊緊戴著口罩，覺得只有遮住臉，才有一絲安全感。</p><h3>💡 給你的一些溫柔建議</h3><ul><li><strong>不要用別人的「精選集」對比自己的「日常」：</strong>社群媒體上的照片大多經過精心的光線調整、角度捕捉和濾鏡修飾。真實的人生都有不完美的一面，你所看到的完美，很多時候只是演算法篩選出的幻象。</li><li><strong>成績是短暫的標籤，你的價值不是：</strong>一次段考的退步，只代表這段時間的學習方法需要調整，並不否定你的智慧和付出。深呼吸，給自己一點時間喘息。</li><li><strong>建立「無條件接納」的口罩卸下練習：</strong>試著在自己感到安全的角落，對著鏡子對自己說：「辛苦了，不完美也沒關係，我依然愛這樣的自己。」</li></ul>',
    author: 'Pandimo 官方專欄',
    readTime: '3 分鐘',
    likes: 245,
    img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'a2',
    category: '課業焦慮',
    badge: '🧭 暑期成長指南',
    bigDataLabel: '📌 溫慢陪伴：想去打工嘗試獨立，又被課業和暑輔壓得喘不過氣？你並不孤單。',
    title: '【閒聊】面對塞滿的暑輔與想打工的心：如何在假期間找到平衡？',
    snippet: '放假本該是放鬆的時候，學校卻排滿了輔導課，而你又想踏出舒適圈去打工賺點零花錢、買喜歡的手帳本，卻又擔心課業被當掉重修... 我們該如何抉擇？',
    content: '<p>下個月就要迎來暑假了，可是學校卻排了滿滿的暑期輔導。很多人覺得去學校發呆、吹冷氣很浪費生命，但又擔心如果不去，下學期的科目會跟不上，甚至面臨被當掉重修的風險，真的很令人頭痛 😭。</p><p>同時，許多同學計畫利用假期到飲料店、超商打工，賺取第一筆屬於自己的零用錢，去買喜歡的文具、手帳本或衣服，卻又怕自己在繁重的課業與工作之間分身乏術...</p><h3>💡 官方建議：假期平衡心法</h3><ul><li><strong>釐清「核心目標」：</strong>先問問自己，這個假期你最想獲得的是什麼？是補充睡眠與精力的「休息」、累積社會經驗與金錢的「打工」，還是修補功課弱點的「學習」？每個目標都沒有錯，但不要奢望能同時 100% 達成。</li><li><strong>時間的碎裂化管理：</strong>若暑輔是必須參加的，可以把打工時間控制在週末或平日晚上，每週不超過 10-15 小時，確保自己有充足的睡眠與複習時間。</li><li><strong>不要害怕拒絕不合理的期待：</strong>如果身體或精力已經發出警訊，請勇敢地向加班或超額的班表說不。假期是為了走更長遠的路，不是用來掏空自己的。</li></ul>',
    author: 'Pandimo 官方專欄',
    readTime: '4 分鐘',
    likes: 189,
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'a3',
    category: '感情告白',
    badge: '💖 青春心靈捕手',
    bigDataLabel: '📌 溫慢陪伴：看著他彈吉他的專注側臉，暗戀的酸甜，是青春歲月裡最美的點綴。',
    title: '【感情】暗戀隔壁班的那個「他/她」？勇敢跨出那一步的勇氣指南',
    snippet: '每當放學經過音樂教室，看到他在台上彈著吉他的帥氣背影，心臟總是漏跳一拍。社團發表會要到了，我該寫張卡片送給他嗎？該不該衝一波？',
    content: '<p>在青澀的高中歲月裡，我們的心裡或多或少都藏著一個特別的人。也許是那個下課趴在桌上睡覺的隔壁班同學，或是放學在熱音社教室裡抱著電吉他專注彈奏的學長。看著他笑起來的虎牙，默默在 Threads 上關注他的日常碎碎唸，心裡總是充滿了酸甜的滋味 🥺。</p><p>隨著學期末社團發表會的臨近，許多同學都在糾結：到底要不要趁這個機會，送上一張手繪卡片或小禮物，向對方表明心意？但又無比害怕一旦被拒絕，在學校見面會無比尷尬...</p><h3>💡 關於暗戀的勇氣指南</h3><ul><li><strong>把告白當作「表達感謝」而非「強求結果」：</strong>告白的本質，是告訴對方：「謝謝你的存在，讓我的青春多了一抹亮麗的風景。」這樣想的話，你的得失心會減輕許多，對方接收時也不會有太大的壓力。</li><li><strong>手寫卡片是最真誠的溫度：</strong>不需要華麗的禮物，一張簡單乾淨的手寫卡片，寫下他的努力與你對他的欣賞，就足以在對方心中留下溫暖的印記。</li><li><strong>無論結果如何，你都無比勇敢：</strong>敢於跨出舒適圈、表達自己愛意的人，本身就閃閃發光。即使沒有開花結果，這份為了喜歡的人而努力變好的自己，也是青春最棒的收穫。</li></ul>',
    author: 'Pandimo 官方專欄',
    readTime: '3 分鐘',
    likes: 312,
    img: 'https://images.unsplash.com/photo-1511295742364-5a9b725df7f0?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_STORE_ITEMS = [
  { id: 's1', type: 'theme', name: '治愈森林綠主題', desc: '為 App 換上如森林般靜謐的綠色面板，舒緩雙眼與心靈。', price: 50, icon: '🌿', limit: '限時折扣' },
  { id: 's2', type: 'theme', name: '深海冥想黑主題', desc: '超有質感的極致深黑護眼主題，適合深夜書寫日記的你。', price: 60, icon: '🌌', limit: '經典款' },
  { id: 's3', type: 'sticker', name: '軟萌貓咪心情貼紙包', desc: '解鎖 10 款超可愛的動態貓咪表情圖案，讓日記更生動。', price: 30, icon: '🐱', limit: '熱銷爆款' },
  { id: 's4', type: 'sticker', name: '心靈角落手繪活動標籤', desc: '解鎖 15 款精美手繪風格的生活習慣插圖，記錄更多細節。', price: 40, icon: '🎨', limit: '新品' },
  
  // High-schoolers snacks, vouchers, stationery
  { id: 's7', type: 'snack', name: '哈瑞寶小熊軟糖分享包', desc: '【實體零食】考試讀書必備！酸甜Q彈的小熊軟糖，嚼一嚼擊退讀書瞌睡。', price: 30, icon: '🧸', limit: '高中生最愛' },
  { id: 's8', type: 'snack', name: '極脆品客洋芋片三入組', desc: '【實體零食】洋蔥、起司、原味經典三合一，深夜解饞與同學分享神器！', price: 45, icon: '🥔', limit: '熱銷解饞' },
  { id: 's9', type: 'food_voucher', name: '麥當勞雙層牛肉吉事堡餐券', desc: '【電子票券】憑券可兌換雙層牛肉吉事堡 + 中薯 + 中可，下課聚會首選！', price: 80, icon: '🍔', limit: '超值速食' },
  { id: 's10', type: 'food_voucher', name: '摩斯漢堡海洋珍珠堡餐券', desc: '【電子票券】高質感必點！珍珠堡搭配靈魂冰紅茶，溫柔療癒你的胃。', price: 90, icon: '🍤', limit: '人氣首選' },
  { id: 's11', type: 'food_voucher', name: '肯德基咔啦雞腿堡餐券', desc: '【電子票券】酥脆多汁咔啦雞腿堡 + 蛋撻 + 紅茶，考試及格的完美獎勵！', price: 85, icon: '🍗', limit: '經典必吃' },
  { id: 's12', type: 'stationery', name: '九乘九文具/金興發 100元券', desc: '【電子票券】高中生天堂！可於全台各大門市兌換精美手帳本、原子筆或立可帶。', price: 50, icon: '✏️', limit: '學生必備' },
  { id: 's13', type: 'stationery', name: '誠品文具 50元禮物點數', desc: '【電子票券】換一支超好寫的有質感水性鋼珠筆，寫功課心情也變美麗。', price: 35, icon: '✒️', limit: '質感文具' }
];

// App State Core Class
class AppState {
  constructor() {
    let storedName = localStorage.getItem('teen_app_name');
    if (!storedName || storedName === '心晴日記') {
      storedName = 'Pandimo';
      localStorage.setItem('teen_app_name', 'Pandimo');
    }
    this.appName = storedName;
    this.points = parseInt(localStorage.getItem('teen_points')) || 320; // Default starts at 320 to allow instant testing of 300 pt unlock!
    this.theme = localStorage.getItem('teen_theme') || 'light';
    this.diaries = JSON.parse(localStorage.getItem('teen_diaries')) || [];
    
    // Check-in database
    this.lastCheckInDate = localStorage.getItem('teen_last_checkin') || '';

    // Gated Chat sessions
    this.freeChatUsed = localStorage.getItem('teen_free_chat_used') === 'true';
    this.chatSessionActive = localStorage.getItem('teen_chat_session_active') === 'true';
    this.chatSessionTimeRemaining = parseInt(localStorage.getItem('teen_chat_time_left')) || 0;
    this.chatSessionType = localStorage.getItem('teen_chat_session_type') || 'free'; // 'free' or 'paid'

    // Matchmaking simulated states
    this.currentChatMode = localStorage.getItem('teen_chat_mode') || 'ai'; // 'ai' or 'volunteer'

    // Read user likes and bookmarks
    this.likedArticles = JSON.parse(localStorage.getItem('teen_liked_articles')) || [];
    this.bookmarkedArticles = JSON.parse(localStorage.getItem('teen_bookmarked_articles')) || [];
    
    // Read redeemed store items
    this.redeemedItems = JSON.parse(localStorage.getItem('teen_redeemed_items')) || [];

    // Seed 3 Months diaries if completely empty or migrating to organic gaps
    if (this.diaries.length === 0 || !localStorage.getItem('teen_diaries_has_gaps')) {
      this.diaries = generateThreeMonthsOfDiaries();
      localStorage.setItem('teen_diaries', JSON.stringify(this.diaries));
      localStorage.setItem('teen_diaries_has_gaps', 'true');
    }

    // Seed new authentic, funny, and realistic high-schooler comments
    this.articleComments = {
      'a1': [
        { name: '數學課睡覺的熊貓', color: '#4be3b5', text: '笑死，我早就放棄排名的東西了，每天睡飽才是真的，大家到底在焦慮三小 😂', time: '1小時前' },
        { name: '躲在棉被裡的北極熊', color: '#ffd35c', text: '說得好...戴口罩真的是安全感來源，不戴出門超躁的，Threads上一堆神仙顏值真的越看越自卑...😭', time: '40分鐘前' },
        { name: '期末考求過的水豚', color: '#ff85a2', text: '哭啊，我爸媽只會拿我跟親戚的小孩比，皮膚爛又考不好，真的直接躺平了啦 QQ', time: '20分鐘前' },
        { name: '渴望放假的貓咪', color: '#8a7cfb', text: '其實這篇說得很對耶，社團裡好看的女生私底下也是用濾鏡遮痘痘，大家不用太焦慮啦，抱一個 🫂', time: '5分鐘前' }
      ],
      'a2': [
        { name: '拿珍奶跑百米的小鹿', color: '#ff9f5c', text: '暑輔真的超爛，學校只會壓榨學生，我都直接請假請爆去打工，錢拿在手裡比較香啦 💸', time: '2小時前' },
        { name: '一口珍奶的企鵝', color: '#6c5ce7', text: '如果怕被重修卡死還是要去一下吧，重修費超貴，打工賺的錢都不夠付，到時候哭都沒眼淚 😭', time: '1.5小時前' },
        { name: '吃飽就犯睏的考拉', color: '#ff7474', text: '笑爛，去暑輔都在睡覺吹冷氣，打工超累根本地獄，除非你想買手帳或機車不然真的先不要', time: '10分鐘前' }
      ],
      'a3': [
        { name: '被考試砸醒的樹懶', color: '#4be3b5', text: '學長我有看過，其實長得蠻普的啊，到底在暈幾點的 XD 可是彈吉他確實有一點帥啦', time: '3小時前' },
        { name: '忘記鉛筆盒的松鼠', color: '#8a7cfb', text: '卡一個後續！這根本偶像劇吧，如果是我連卡片都不敢送，直接在台下當小透明 555', time: '1小時前' },
        { name: '北極星下的流浪貓', color: '#ffd35c', text: '衝了啦！大不了一輩子尷尬，青春就是要不留遺憾，手寫卡片真的超有溫度，學長收到一定超開心！', time: '15分鐘前' }
      ]
    };
    localStorage.setItem('teen_article_comments', JSON.stringify(this.articleComments));
  }

  save() {
    localStorage.setItem('teen_app_name', this.appName);
    localStorage.setItem('teen_points', this.points.toString());
    localStorage.setItem('teen_theme', this.theme);
    localStorage.setItem('teen_diaries', JSON.stringify(this.diaries));
    localStorage.setItem('teen_last_checkin', this.lastCheckInDate);
    localStorage.setItem('teen_free_chat_used', this.freeChatUsed ? 'true' : 'false');
    localStorage.setItem('teen_chat_session_active', this.chatSessionActive ? 'true' : 'false');
    localStorage.setItem('teen_chat_time_left', this.chatSessionTimeRemaining.toString());
    localStorage.setItem('teen_chat_session_type', this.chatSessionType);
    localStorage.setItem('teen_chat_mode', this.currentChatMode);
    localStorage.setItem('teen_liked_articles', JSON.stringify(this.likedArticles));
    localStorage.setItem('teen_bookmarked_articles', JSON.stringify(this.bookmarkedArticles));
    localStorage.setItem('teen_redeemed_items', JSON.stringify(this.redeemedItems));
    localStorage.setItem('teen_article_comments', JSON.stringify(this.articleComments));
  }

  addDiary(date, mood, activities, note) {
    const newEntry = {
      id: Date.now().toString(),
      date,
      mood,
      activities,
      note
    };
    this.diaries.unshift(newEntry);
    this.points += 10; // Reward writing mood diary with +10 pt
    this.save();
    return newEntry;
  }

  deleteDiary(id) {
    this.diaries = this.diaries.filter(d => d.id !== id);
    this.save();
  }

  checkIn() {
    const todayStr = new Date().toISOString().split('T')[0];
    if (this.lastCheckInDate === todayStr) {
      return false; // Already checked in
    }
    this.lastCheckInDate = todayStr;
    this.points += 10; // Reward daily login sign-in with +10 pt
    this.save();
    return true;
  }

  unlockChatSession(type) {
    if (type === 'free') {
      this.freeChatUsed = true;
      this.chatSessionActive = true;
      this.chatSessionTimeRemaining = 2400; // 40 minutes = 2400 seconds
      this.chatSessionType = 'free';
      this.currentChatMode = 'ai';
      this.save();
      return true;
    } else if (type === 'paid') {
      if (this.points >= 300) {
        this.points -= 300; // Costs 300 points to unlock chat session
        this.chatSessionActive = true;
        this.chatSessionTimeRemaining = 2400; // 40 minutes
        this.chatSessionType = 'paid';
        this.currentChatMode = 'ai';
        this.save();
        return true;
      }
    }
    return false;
  }

  endChatSession() {
    this.chatSessionActive = false;
    this.chatSessionTimeRemaining = 0;
    this.currentChatMode = 'ai';
    this.save();
  }

  toggleLikeArticle(id) {
    if (this.likedArticles.includes(id)) {
      this.likedArticles = this.likedArticles.filter(item => item !== id);
    } else {
      this.likedArticles.push(id);
    }
    this.save();
  }

  toggleBookmarkArticle(id) {
    if (this.bookmarkedArticles.includes(id)) {
      this.bookmarkedArticles = this.bookmarkedArticles.filter(item => item !== id);
    } else {
      this.bookmarkedArticles.push(id);
    }
    this.save();
  }

  redeemItem(id, price) {
    if (this.points >= price && !this.redeemedItems.includes(id)) {
      this.points -= price;
      this.redeemedItems.push(id);
      this.save();
      return true;
    }
    return false;
  }

  resetData() {
    localStorage.clear();
    this.appName = 'Pandimo';
    this.points = 320;
    this.theme = 'light';
    this.lastCheckInDate = '';
    this.freeChatUsed = false;
    this.chatSessionActive = false;
    this.chatSessionTimeRemaining = 0;
    this.chatSessionType = 'free';
    this.currentChatMode = 'ai';
    this.diaries = generateThreeMonthsOfDiaries(); // Seeded automatically
    localStorage.setItem('teen_diaries_has_gaps', 'true');
    this.likedArticles = [];
    this.bookmarkedArticles = [];
    this.redeemedItems = [];
    this.articleComments = {}; // Re-seeds automatically on save/constructor reload
    this.save();
  }
}

// Instantiate Global State
const state = new AppState();

// Global Countdown interval variable
let countdownInterval = null;

// UI Elements & State Helper
document.addEventListener('DOMContentLoaded', () => {
  // Initialize clock in status bar
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // Load configuration details
  applyGlobalConfig();

  // Navigation tab routing
  setupNavigation();

  // Setup sidebar events
  setupSidebarControls();

  // Setup Daily Check-in Sign-in button
  setupCheckInButton();

  // Page Specific Inits
  initDiaryPage();
  initArticlesPage();
  initChatPage();
  initStorePage();

  // Start Gated Chat Countdown if session was active
  if (state.chatSessionActive && state.chatSessionTimeRemaining > 0) {
    startSessionTimer();
  }

  // Default Page routing
  switchPage('diary');

  // Fade out splash screen after 3 seconds (3000ms)
  setTimeout(() => {
    const splashScreen = document.getElementById('app-splash-screen');
    if (splashScreen) {
      splashScreen.classList.add('fade-out');
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 600); // Wait for transition opacity animation to complete
    }
  }, 3000);
});

// Update Phone Clock
function updateLiveClock() {
  const clockEl = document.getElementById('hardware-clock');
  if (clockEl) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clockEl.textContent = `${hours}:${minutes}`;
  }
}

// Check-in Sign-in logic
function setupCheckInButton() {
  const checkInBtn = document.getElementById('btn-checkin-header');
  const adminCheckInBtn = document.getElementById('btn-admin-checkin');

  const updateCheckInButtonsVisual = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isChecked = state.lastCheckInDate === todayStr;

    [checkInBtn, adminCheckInBtn].forEach(btn => {
      if (btn) {
        if (isChecked) {
          btn.innerHTML = '✨ 已簽到';
          btn.classList.add('checked-in');
          btn.style.opacity = '0.7';
          btn.style.cursor = 'default';
        } else {
          btn.innerHTML = '📅 簽到領積分';
          btn.classList.remove('checked-in');
          btn.style.opacity = '1';
          btn.style.cursor = 'pointer';
        }
      }
    });
  };

  const handleCheckIn = (targetBtn) => {
    const success = state.checkIn();
    if (success) {
      updateCheckInButtonsVisual();
      updateAppHeaders();
      triggerCoinExplosion(targetBtn);
      flashDynamicIsland('🎉 每日簽到成功！積分 +10');
      
      // Refresh Store points if visible
      if (document.getElementById('page-store').classList.contains('active')) {
        renderStore();
      }
    } else {
      alert('💡 您今天已經簽到過囉！明天再來拿積分吧。🌟');
    }
  };

  [checkInBtn, adminCheckInBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        handleCheckIn(e.target);
      });
    }
  });

  updateCheckInButtonsVisual();
}

// Apply App Configurations
function applyGlobalConfig() {
  document.documentElement.setAttribute('data-theme', state.theme);
  
  const themeToggle = document.getElementById('theme-select');
  if (themeToggle) themeToggle.value = state.theme;

  const appNameInput = document.getElementById('admin-app-name');
  if (appNameInput) appNameInput.value = state.appName;

  updateAppHeaders();
}

function updateAppHeaders() {
  const titleEls = document.querySelectorAll('.app-title');
  titleEls.forEach(el => el.textContent = state.appName);

  const pointsPillVal = document.getElementById('points-pill-value');
  if (pointsPillVal) pointsPillVal.textContent = state.points;

  const pointsHeroVal = document.getElementById('store-hero-points-value');
  if (pointsHeroVal) pointsHeroVal.textContent = state.points;
  
  const sidebarPoints = document.getElementById('sidebar-user-points');
  if (sidebarPoints) sidebarPoints.textContent = state.points;
}

// Router Control
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = item.getAttribute('data-page');
      switchPage(targetPage);
    });
  });
}

function switchPage(pageId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-page') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  document.querySelectorAll('.app-page').forEach(page => {
    if (page.id === `page-${pageId}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Rendering
  if (pageId === 'diary') {
    renderCalendar();
    renderStatistics();
    renderHistoryLogs();
  } else if (pageId === 'articles') {
    renderArticles();
  } else if (pageId === 'chat') {
    renderChatRoomView();
  } else if (pageId === 'store') {
    renderStore();
  }
}

// Sidebar settings
function setupSidebarControls() {
  const appNameInput = document.getElementById('admin-app-name');
  if (appNameInput) {
    appNameInput.addEventListener('input', (e) => {
      state.appName = e.target.value.trim() || 'Pandimo';
      state.save();
      updateAppHeaders();
    });
  }

  const themeToggle = document.getElementById('theme-select');
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      state.theme = e.target.value;
      state.save();
      applyGlobalConfig();
    });
  }

  // Seeding/Generating 3 months logs
  const injectBtn = document.getElementById('btn-inject-data');
  if (injectBtn) {
    injectBtn.addEventListener('click', () => {
      state.diaries = generateThreeMonthsOfDiaries();
      state.points += 100;
      state.save();
      updateAppHeaders();
      
      flashDynamicIsland('🎉 已成功寫入 3 個月歷史日記！');
      
      if (document.getElementById('page-diary').classList.contains('active')) {
        renderCalendar();
        renderStatistics();
        renderHistoryLogs();
      }
    });
  }

  // Clear DB
  const resetBtn = document.getElementById('btn-reset-db');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('確定要清除所有測試數據並恢復預設值嗎？這將重置心情與打卡記錄。')) {
        state.resetData();
        applyGlobalConfig();
        setupCheckInButton();
        if (countdownInterval) clearInterval(countdownInterval);
        switchPage('diary');
        flashDynamicIsland('🔄 數據庫已完全重置！');
      }
    });
  }
}

function flashDynamicIsland(message) {
  const island = document.getElementById('phone-island');
  if (island) {
    island.style.width = '240px';
    island.style.height = '36px';
    island.style.borderRadius = '18px';
    island.innerHTML = `<span style="color:#4be3b5; font-size:11px; white-space:nowrap; display:flex; align-items:center; justify-content:center; height:100%; font-weight:700;">${message}</span>`;
    
    setTimeout(() => {
      island.style.width = '110px';
      island.style.height = '28px';
      island.style.borderRadius = '20px';
      island.innerHTML = '';
    }, 3500);
  }
}

function triggerCoinExplosion(targetEl) {
  if (!targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin-effect';
    coin.innerHTML = '🪙';
    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 80;

    coin.style.setProperty('--dx', `${dx}px`);
    coin.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 800);
  }
}


// --- DIARY PAGE LOGIC ---
let calendarYear = 2026;
let calendarMonth = 4; // May

function initDiaryPage() {
  const monthSelector = document.getElementById('calendar-month-select');
  if (monthSelector) {
    monthSelector.addEventListener('change', (e) => {
      const parts = e.target.value.split('-');
      calendarYear = parseInt(parts[0]);
      calendarMonth = parseInt(parts[1]);
      renderCalendar();
    });
  }

  const prevBtn = document.getElementById('btn-calendar-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      calendarMonth--;
      if (calendarMonth < 0) {
        calendarMonth = 11;
        calendarYear--;
      }
      syncMonthDropdown();
      renderCalendar();
    });
  }

  const nextBtn = document.getElementById('btn-calendar-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      calendarMonth++;
      if (calendarMonth > 11) {
        calendarMonth = 0;
        calendarYear++;
      }
      syncMonthDropdown();
      renderCalendar();
    });
  }

  const fabBtn = document.getElementById('fab-diary-add');
  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      openDiaryModal();
    });
  }

  const closeModalBtn = document.getElementById('modal-diary-close');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      closeDiaryModal();
    });
  }

  const moodBtns = document.querySelectorAll('.mood-select-btn');
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  const actBtns = document.querySelectorAll('.activity-btn');
  actBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Submit log
  const submitBtn = document.getElementById('btn-diary-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const selectedMoodEl = document.querySelector('.mood-select-btn.selected');
      if (!selectedMoodEl) {
        alert('請先選擇一個心情貼紙！');
        return;
      }
      const mood = selectedMoodEl.getAttribute('data-mood');

      const activeActivities = [];
      document.querySelectorAll('.activity-btn.active').forEach(b => {
        activeActivities.push(b.getAttribute('data-activity'));
      });

      const noteText = document.getElementById('diary-note-input').value.trim();
      
      const todayStr = new Date().toISOString().split('T')[0];

      // Add to State
      state.addDiary(todayStr, mood, activeActivities, noteText);
      updateAppHeaders();

      triggerCoinExplosion(submitBtn);
      flashDynamicIsland('✨ 日記已儲存，獲得 +10 積分！');

      renderCalendar();
      renderStatistics();
      renderHistoryLogs();

      closeDiaryModal();
    });
  }
}

function syncMonthDropdown() {
  const monthSelector = document.getElementById('calendar-month-select');
  if (monthSelector) {
    monthSelector.value = `${calendarYear}-${calendarMonth}`;
  }
}

function renderCalendar() {
  const gridContainer = document.getElementById('diary-calendar-grid');
  if (!gridContainer) return;

  const dayLabels = gridContainer.querySelectorAll('.calendar-day-label');
  gridContainer.innerHTML = '';
  dayLabels.forEach(lbl => gridContainer.appendChild(lbl));

  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    gridContainer.appendChild(emptyCell);
  }

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    dayCell.textContent = day;

    const curMonthFormatted = (calendarMonth + 1) < 10 ? `0${calendarMonth + 1}` : (calendarMonth + 1);
    const curDayFormatted = day < 10 ? `0${day}` : day;
    const fullDateStr = `${calendarYear}-${curMonthFormatted}-${curDayFormatted}`;

    if (fullDateStr === todayStr) {
      dayCell.classList.add('today');
    }

    const entry = state.diaries.find(d => d.date === fullDateStr);
    if (entry) {
      const emojiContainer = document.createElement('div');
      emojiContainer.className = 'mood-emoji-cell';
      emojiContainer.innerHTML = MOOD_SVGS[entry.mood];
      dayCell.appendChild(emojiContainer);
      
      dayCell.addEventListener('click', () => {
        showDiaryDetailDialog(entry);
      });
    } else {
      dayCell.addEventListener('click', () => {
        openDiaryModal(fullDateStr);
      });
    }

    gridContainer.appendChild(dayCell);
  }
}

function showDiaryDetailDialog(entry) {
  const acts = entry.activities.map(a => `<span class="diary-activity-tag">${ACTIVITY_ICONS[a] || '🏷️'} ${a}</span>`).join('');
  const detailHtml = `
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="width:50px; height:50px; margin: 0 auto 8px auto;">${MOOD_SVGS[entry.mood]}</div>
      <strong style="color:var(--primary); font-size:15px;">今天感覺「${MOOD_LABELS[entry.mood]}」</strong>
    </div>
    <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; background-color:var(--bg-primary); padding:12px; border-radius:12px; margin-bottom:12px;">${entry.note || '今天沒有留下備註內容✍️'}</p>
    <div class="diary-item-activities" style="margin-bottom:16px; justify-content:center;">${acts || '<span style="font-size:11px;color:var(--text-muted);">無標記活動</span>'}</div>
    <button class="btn btn-secondary" onclick="closeDiaryDetailDialog()" style="width:100%;">關閉視窗</button>
  `;

  const dialogOverlay = document.createElement('div');
  dialogOverlay.id = 'temp-detail-dialog';
  dialogOverlay.className = 'modal-overlay';
  dialogOverlay.style.display = 'flex';
  dialogOverlay.style.zIndex = '1006';
  
  dialogOverlay.innerHTML = `
    <div class="modal-sheet" style="border-radius:24px; margin:auto 16px 16px 16px;">
      <div class="modal-header">
        <span class="modal-title">${entry.date} 日記回顧</span>
        <button class="modal-close" onclick="closeDiaryDetailDialog()">✕</button>
      </div>
      ${detailHtml}
    </div>
  `;

  document.getElementById('phone-screen-container').appendChild(dialogOverlay);
}

window.closeDiaryDetailDialog = () => {
  const dialog = document.getElementById('temp-detail-dialog');
  if (dialog) dialog.remove();
};

function openDiaryModal(preselectedDateStr = null) {
  const overlay = document.getElementById('overlay-diary-modal');
  if (!overlay) return;

  const headerEl = document.getElementById('modal-diary-date-header');
  const targetDate = preselectedDateStr || new Date().toISOString().split('T')[0];
  headerEl.textContent = `記錄 ${targetDate} 的生活`;

  document.querySelectorAll('.mood-select-btn').forEach(btn => btn.classList.remove('selected'));
  document.querySelectorAll('.activity-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('diary-note-input').value = '';

  overlay.style.display = 'flex';
}

function closeDiaryModal() {
  const overlay = document.getElementById('overlay-diary-modal');
  if (overlay) overlay.style.display = 'none';
}

function renderStatistics() {
  const counts = { cool: 0, good: 0, neutral: 0, bad: 0, awful: 0 };
  state.diaries.forEach(d => {
    if (counts[d.mood] !== undefined) counts[d.mood]++;
  });

  const totalDiaries = state.diaries.length;

  const moodsKey = ['awful', 'bad', 'neutral', 'good', 'cool'];
  const maxCount = Math.max(...Object.values(counts), 1);

  moodsKey.forEach(mood => {
    const count = counts[mood];
    const percentage = (count / maxCount) * 100;
    
    const column = document.getElementById(`chart-col-${mood}`);
    if (column) {
      const barRect = column.querySelector('.chart-bar-rect');
      const barVal = column.querySelector('.chart-bar-value');
      
      if (barRect) {
        barRect.style.height = `${Math.max(percentage, 5)}%`;
        barRect.style.backgroundColor = `var(--mood-${mood})`;
      }
      if (barVal) barVal.textContent = count;
    }
  });

  const goodCount = counts.cool + counts.good;
  const normalCount = counts.neutral;
  const badCount = counts.bad + counts.awful;

  const summaryTotal = goodCount + normalCount + badCount;
  
  const goodPct = summaryTotal > 0 ? Math.round((goodCount / summaryTotal) * 100) : 0;
  const normalPct = summaryTotal > 0 ? Math.round((normalCount / summaryTotal) * 100) : 0;
  const badPct = summaryTotal > 0 ? Math.round((badCount / summaryTotal) * 100) : 0;

  const centerNum = document.getElementById('donut-center-total-num');
  if (centerNum) centerNum.textContent = totalDiaries;

  const circ = 251.2;
  const segmentGood = document.getElementById('donut-seg-good');
  const segmentNormal = document.getElementById('donut-seg-normal');
  const segmentBad = document.getElementById('donut-seg-bad');

  if (segmentGood && segmentNormal && segmentBad) {
    if (summaryTotal === 0) {
      segmentGood.style.strokeDasharray = `0 ${circ}`;
      segmentNormal.style.strokeDasharray = `0 ${circ}`;
      segmentBad.style.strokeDasharray = `0 ${circ}`;
    } else {
      let currentOffset = 0;

      const goodLength = (goodCount / summaryTotal) * circ;
      segmentGood.style.strokeDasharray = `${goodLength} ${circ}`;
      segmentGood.style.strokeDashoffset = `${currentOffset}`;
      currentOffset -= goodLength;

      const normalLength = (normalCount / summaryTotal) * circ;
      segmentNormal.style.strokeDasharray = `${normalLength} ${circ}`;
      segmentNormal.style.strokeDashoffset = `${currentOffset}`;
      currentOffset -= normalLength;

      const badLength = (badCount / summaryTotal) * circ;
      segmentBad.style.strokeDasharray = `${badLength} ${circ}`;
      segmentBad.style.strokeDashoffset = `${currentOffset}`;
    }
  }

  const lblGood = document.getElementById('legend-pct-good');
  const lblNormal = document.getElementById('legend-pct-normal');
  const lblBad = document.getElementById('legend-pct-bad');

  if (lblGood) lblGood.textContent = `${goodPct}% (${goodCount}次)`;
  if (lblNormal) lblNormal.textContent = `${normalPct}% (${normalCount}次)`;
  if (lblBad) lblBad.textContent = `${badPct}% (${badCount}次)`;

  // Streaks
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const weekDotsEl = document.getElementById('diary-weekly-dots-row');
  if (weekDotsEl) {
    weekDotsEl.innerHTML = '';
    const daysKeys = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let dIndex = 0; dIndex < 7; dIndex++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - (currentDayOfWeek - dIndex));
      const targetStr = targetDate.toISOString().split('T')[0];

      const hasEntry = state.diaries.some(d => d.date === targetStr);
      const col = document.createElement('div');
      col.className = 'diary-stats-dot-col';

      let isTodayClass = (dIndex === currentDayOfWeek) ? 'style="border-color:var(--accent-dark);"' : '';

      col.innerHTML = `
        <div class="diary-stats-circle ${hasEntry ? 'filled' : ''}" ${isTodayClass}>
          ${hasEntry ? '✓' : '0'}
        </div>
        <div class="diary-stats-dot-lbl">${daysKeys[dIndex]}</div>
      `;
      weekDotsEl.appendChild(col);
    }
  }
}

function renderHistoryLogs() {
  const container = document.getElementById('diary-history-list');
  if (!container) return;

  container.innerHTML = '';

  if (state.diaries.length === 0) {
    container.innerHTML = `
      <div class="empty-history-tip">
        <p>目前還沒有任何心情日記紀錄喔！</p>
      </div>
    `;
    return;
  }

  state.diaries.slice(0, 10).forEach(entry => { // Display only the 10 most recent for UI speed
    const card = document.createElement('div');
    card.className = 'diary-item-card';

    const tagsHtml = entry.activities.map(a => `
      <span class="diary-activity-tag">
        ${ACTIVITY_ICONS[a] || '🏷️'} ${a}
      </span>
    `).join('');

    card.innerHTML = `
      <div class="diary-item-emoji">${MOOD_SVGS[entry.mood]}</div>
      <div class="diary-item-content">
        <div class="diary-item-meta">
          <span class="diary-item-date">${entry.date}</span>
          <span class="diary-item-mood-text" style="color:var(--mood-${entry.mood}); background-color:rgba(var(--primary-light), 0.1); font-weight:700;">
            ${MOOD_LABELS[entry.mood]}
          </span>
        </div>
        <p class="diary-item-text">${entry.note || '<em style="color:var(--text-muted);">無備註紀錄</em>'}</p>
        <div class="diary-item-activities">${tagsHtml}</div>
      </div>
      <button class="diary-delete-btn" data-id="${entry.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
      </button>
    `;

    const delBtn = card.querySelector('.diary-delete-btn');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('確定要刪除這篇日記紀錄嗎？')) {
        state.deleteDiary(entry.id);
        renderCalendar();
        renderStatistics();
        renderHistoryLogs();
        flashDynamicIsland('🗑️ 日記已刪除！');
      }
    });

    container.appendChild(card);
  });
}


// --- ARTICLES PAGE LOGIC ---
function initArticlesPage() {
  const searchInput = document.getElementById('article-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderArticles();
    });
  }

  const drawerBackBtn = document.getElementById('btn-article-drawer-back');
  if (drawerBackBtn) {
    drawerBackBtn.addEventListener('click', () => {
      closeArticleDrawer();
    });
  }
}

function renderArticles() {
  const container = document.getElementById('articles-feed-list');
  if (!container) return;

  container.innerHTML = '';

  const searchInput = document.getElementById('article-search');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const filtered = DEFAULT_ARTICLES.filter(art => {
    return art.title.toLowerCase().includes(query) || art.snippet.toLowerCase().includes(query);
  });

  filtered.forEach(art => {
    const card = document.createElement('div');
    card.className = 'article-card';

    const isLiked = state.likedArticles.includes(art.id);
    const isBookmarked = state.bookmarkedArticles.includes(art.id);

    card.innerHTML = `
      <div class="article-cover">
        <img src="${art.img}" alt="cover">
      </div>
      <div class="article-card-body">
        <h3 class="article-card-title">${art.title}</h3>
        <p class="article-card-snippet">${art.snippet}</p>
        <div class="article-card-footer">
          <span style="font-size: 11px; color: var(--text-secondary); font-weight: 500;">⏱️ ${art.readTime} 閱讀</span>
          <div class="article-actions-box">
            <button class="article-btn-icon btn-like ${isLiked ? 'liked' : ''}" data-id="${art.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span style="font-size:10px; margin-left:2px;">${art.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button class="article-btn-icon btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-id="${art.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.article-actions-box')) return;
      openArticleDrawer(art);
    });

    const likeBtn = card.querySelector('.btn-like');
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.toggleLikeArticle(art.id);
      renderArticles();
    });

    const bookmarkBtn = card.querySelector('.btn-bookmark');
    bookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.toggleBookmarkArticle(art.id);
      renderArticles();
      flashDynamicIsland(state.bookmarkedArticles.includes(art.id) ? '🔖 文章已加入收藏！' : '🗑️ 文章已取消收藏');
    });

    container.appendChild(card);
  });
}

const ANONYMOUS_NICKNAMES = [
  '渴望放假的貓咪', '期期盼盼的水豚', '數學課睡覺的熊貓', '一口珍奶的企鵝', 
  '拿珍奶跑百米的小鹿', '躲在被窩的北極熊', '看黑板發呆的樹懶', '忘記鉛筆盒的松鼠',
  '想點滿幸運值的黑貓', '吃飽就犯睏的考拉', '北極星下的流浪貓', '喜歡做夢的獨角獸'
];

const AVATAR_COLORS = ['#8a7cfb', '#ff85a2', '#4be3b5', '#ffd35c', '#ff9f5c', '#ff7474', '#6c5ce7', '#e84393'];

function openArticleDrawer(art) {
  const drawer = document.getElementById('article-detail-drawer');
  if (!drawer) return;

  const body = document.getElementById('article-drawer-content-box');
  if (body) {
    let randomNickname = ANONYMOUS_NICKNAMES[Math.floor(Math.random() * ANONYMOUS_NICKNAMES.length)];
    
    body.innerHTML = `
      <img src="${art.img}" class="article-detail-img" alt="cover">
      <div class="article-detail-meta">
        <span>⏱️ ${art.readTime} 閱讀</span>
      </div>
      <h2 class="article-detail-title">${art.title}</h2>
      <div class="article-detail-content">${art.content}</div>
      
      <hr class="drawer-divider">
      
      <div class="anonymous-discussion-section">
        <h3>討論區</h3>
        
        <div class="comments-list" id="article-comments-list">
          <!-- Comments list -->
        </div>
        
        <div class="comment-input-area">
          <div class="nickname-generator-row">
            <span class="random-nickname-label">🏷️ 您的隨機匿名：</span>
            <span class="random-nickname-val" id="comment-random-nickname">${randomNickname}</span>
            <button class="btn-refresh-nickname" id="btn-refresh-comment-nickname">🔄 換一個</button>
          </div>
          <div class="comment-input-box">
            <textarea id="comment-text-input" placeholder="匿名說點什麼...（例如：看完這篇超有共鳴的！😭）"></textarea>
            <button id="btn-comment-submit">發送</button>
          </div>
        </div>
      </div>
    `;

    const renderCommentsList = () => {
      const listContainer = document.getElementById('article-comments-list');
      if (!listContainer) return;
      listContainer.innerHTML = '';
      
      const comments = state.articleComments[art.id] || [];
      if (comments.length === 0) {
        listContainer.innerHTML = `<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 12px 0;">目前尚無同學留言，快來搶沙發發言吧！🎈</p>`;
        return;
      }
      
      comments.forEach(comment => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        
        const firstLetter = comment.name ? comment.name.charAt(0) : '匿';
        const color = comment.color || '#8a7cfb';
        
        item.innerHTML = `
          <div class="comment-avatar" style="background-color: ${color};">${firstLetter}</div>
          <div class="comment-body">
            <div class="comment-header">
              <span class="comment-nickname">${comment.name}</span>
              <span class="comment-time">${comment.time}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
          </div>
        `;
        listContainer.appendChild(item);
      });
      listContainer.scrollTop = listContainer.scrollHeight;
    };

    renderCommentsList();

    const refreshBtn = document.getElementById('btn-refresh-comment-nickname');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        let newNickname = ANONYMOUS_NICKNAMES[Math.floor(Math.random() * ANONYMOUS_NICKNAMES.length)];
        while (newNickname === randomNickname) {
          newNickname = ANONYMOUS_NICKNAMES[Math.floor(Math.random() * ANONYMOUS_NICKNAMES.length)];
        }
        randomNickname = newNickname;
        document.getElementById('comment-random-nickname').textContent = randomNickname;
      });
    }

    const submitCommentBtn = document.getElementById('btn-comment-submit');
    if (submitCommentBtn) {
      submitCommentBtn.addEventListener('click', () => {
        const textarea = document.getElementById('comment-text-input');
        if (!textarea) return;
        const text = textarea.value.trim();
        if (!text) {
          alert('請輸入留言內容！');
          return;
        }

        if (!state.articleComments[art.id]) {
          state.articleComments[art.id] = [];
        }
        
        const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
        
        state.articleComments[art.id].push({
          name: randomNickname,
          color: randomColor,
          text: text,
          time: '剛剛'
        });
        
        state.points += 5;
        state.save();
        updateAppHeaders();

        renderCommentsList();
        textarea.value = '';

        triggerCoinExplosion(submitCommentBtn);
        flashDynamicIsland('🎉 感謝匿名分享！積分 +5 點 🪙');
      });
    }
  }

  drawer.style.display = 'flex';
}

function closeArticleDrawer() {
  const drawer = document.getElementById('article-detail-drawer');
  if (drawer) drawer.style.display = 'none';
}


// --- CHAT PAGE LOGIC (UPGRADED WITH TIME COUNTDOWN, POINTS UNLOCK & VOLUNTEER MATCH) ---

function initChatPage() {
  const sendBtn = document.getElementById('btn-chat-send');
  const chatInput = document.getElementById('chat-msg-input');

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      handleUserSendMessage();
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSendMessage();
      }
    });
  }

  // Hook up session button clicks
  const startFreeBtn = document.getElementById('btn-chat-start-free');
  if (startFreeBtn) {
    startFreeBtn.addEventListener('click', () => {
      const success = state.unlockChatSession('free');
      if (success) {
        renderChatRoomView();
        startSessionTimer();
        flashDynamicIsland('🎁 已開啟 40 分鐘免費聊天對話！');
        appendChatBubble('bot', '嗨！我是 Pandimo 🐼✨ 這裡是你專屬的溫暖空間。今天生活過得怎麼樣呢？段考、暑輔、人際關係或是任何想碎碎唸的瑣事，都可以隨時跟我聊聊喔！🌸');
      }
    });
  }

  const unlockPaidBtn = document.getElementById('btn-chat-unlock-paid');
  if (unlockPaidBtn) {
    unlockPaidBtn.addEventListener('click', (e) => {
      if (state.points < 300) {
        alert(`💡 積分不足！開啟下一段 40 分鐘聊聊需要 300 積分，而你目前只有 ${state.points} 積分。\n\n你可以透過以下方式賺取積分：\n1. 每日簽到 (+10 積分)\n2. 紀錄心情日記 (+10 積分)`);
        return;
      }
      const success = state.unlockChatSession('paid');
      if (success) {
        updateAppHeaders();
        renderChatRoomView();
        startSessionTimer();
        triggerCoinExplosion(e.target);
        flashDynamicIsland('🔑 成功消耗 300 積分開啟聊聊對話！');
        appendChatBubble('bot', '謝謝你用積分支持 Pandimo 🐼💖 我已經泡好了熱可可，準備好聽你吐苦水了！今天生活中有遇到什麼讓你覺得煩惱的事，或者有什麼不敢跟爸媽說的秘密嗎？儘管跟我聊聊吧！✨');
      }
    });
  }
}

// Session Timer engine
function startSessionTimer() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    if (state.chatSessionActive && state.chatSessionTimeRemaining > 0) {
      state.chatSessionTimeRemaining--;
      state.save();
      
      updateTimerBadge();

      if (state.chatSessionTimeRemaining <= 0) {
        clearInterval(countdownInterval);
        state.endChatSession();
        updateAppHeaders();
        renderChatRoomView();
        alert('⏱️ 40 分鐘的對話時間已結束！對話已自動封存。未來聊天需要 300 積分喔！🌟');
      }
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
  
  updateTimerBadge();
}

function updateTimerBadge() {
  const timerBadge = document.getElementById('chat-timer-countdown-text');
  if (timerBadge) {
    const mins = Math.floor(state.chatSessionTimeRemaining / 60);
    const secs = state.chatSessionTimeRemaining % 60;
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const formattedSecs = secs < 10 ? '0' + secs : secs;
    timerBadge.textContent = `⏱️ 剩餘時間 ${formattedMins}:${formattedSecs}`;
  }
}

function renderChatRoomView() {
  const welcomeView = document.getElementById('chat-welcome-trial');
  const lockedView = document.getElementById('chat-locked-overlay');
  const activeRoomView = document.getElementById('chat-active-room');
  const timerHeader = document.getElementById('chat-timer-header-banner');

  // Hide all first
  welcomeView.style.display = 'none';
  lockedView.style.display = 'none';
  activeRoomView.style.display = 'none';
  timerHeader.style.display = 'none';

  if (state.chatSessionActive) {
    // Session is running! Show room and timer banner
    activeRoomView.style.display = 'block';
    timerHeader.style.display = 'flex';
  } else {
    // Session locked or never started
    if (!state.freeChatUsed) {
      // First trial screen
      welcomeView.style.display = 'flex';
    } else {
      // Must unlock using points
      lockedView.style.display = 'flex';
    }
  }

  // Bind Quick prompts events inside active room
  const hints = activeRoomView.querySelectorAll('.chat-hint-tag');
  hints.forEach(hint => {
    // Remove previous listeners to prevent multiple submits
    const clone = hint.cloneNode(true);
    hint.parentNode.replaceChild(clone, hint);
    
    clone.addEventListener('click', () => {
      const text = clone.textContent.replace(/[🎉😢💡]/g, '').trim();
      const textarea = document.getElementById('chat-msg-input');
      if (textarea) {
        textarea.value = text;
        handleUserSendMessage();
      }
    });
  });
}

function appendChatBubble(sender, text, isCustomHtml = false) {
  const container = document.getElementById('chat-message-history');
  if (!container) return;

  const bubbleRow = document.createElement('div');
  // Check sender: 'bot', 'user', or 'volunteer'
  bubbleRow.className = `chat-bubble-row ${sender === 'user' ? 'user' : 'bot'}`;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (sender === 'user') {
    bubbleRow.innerHTML = `
      <div class="chat-bubble">
        <div>${text}</div>
        <div class="chat-time">${timeStr}</div>
      </div>
    `;
  } else if (sender === 'volunteer') {
    // Volunteers have orange styling
    bubbleRow.innerHTML = `
      <div class="chat-avatar" style="background-color: var(--accent-light); color: var(--accent-dark);">天使</div>
      <div class="chat-bubble" style="background-color: var(--accent-light); border: 1.5px solid var(--accent); color: var(--text-primary); border-bottom-left-radius: 4px;">
        <div style="font-weight:700; font-size:11px; margin-bottom:4px; color:var(--accent-dark);">👼 匿名真人志工</div>
        <div>${text}</div>
        <div class="chat-time" style="color: var(--text-secondary);">${timeStr}</div>
      </div>
    `;
  } else {
    // Normal AI Companion Bot
    bubbleRow.innerHTML = `
      <div class="chat-avatar">🐼</div>
      <div class="chat-bubble">
        <div>${text}</div>
        <div class="chat-time">${timeStr}</div>
      </div>
    `;
  }

  container.appendChild(bubbleRow);
  container.scrollTop = container.scrollHeight;
}

// Generate smart-replies for Volunteer Mock chat
function generateVolunteerReply(userMsg) {
  const msg = userMsg.toLowerCase();
  
  if (msg.includes('累') || msg.includes('功課') || msg.includes('課業') || msg.includes('段考') || msg.includes('成績') || msg.includes('當掉') || msg.includes('爛透了') || msg.includes('壓力')) {
    return `聽到你說壓力大，我真的好心疼喔 😭 高中的課業跟排名壓力真的超級沉重。沒關係，我們現在先把書本和排名放一邊，好好放空休息一下，陪伴志工會一直在這裡陪著你！`;
  }
  
  if (msg.includes('謝謝') || msg.includes('好多了')) {
    return `不用客氣！能陪你聊聊也是我的幸運。記得喔，你已經做得非常棒了，不需要總是強迫自己表現得很堅強。累了的時候隨時可以回這個樹洞找我。`;
  }
  
  return `謝謝你願意相信我、跟我分享這些感受。大腦裝了太多心事會很沈重，把話說出來會輕鬆很多。你現在想喝杯手搖杯、或者聽我跟你分享一些我們高中生專屬的解壓小魔法嗎？`;
}

function generateBotReply(userMsg) {
  const msg = userMsg.toLowerCase();
  const latestDiary = state.diaries[0];
  const latestMood = latestDiary ? latestDiary.mood : 'none';

  if (msg.includes('心情超棒') || msg.includes('高興') || msg.includes('開心') || msg.includes('讚') || msg.includes('水喔')) {
    return `太棒了！看到你今天心情這麼好，Pandimo 也超開心的！🌟 趕快把這個好心情記錄在今天的日記裡，以後被段考折磨的時候可以拿出來回味一下哈哈！✨`;
  }

  if (msg.includes('推薦') || msg.includes('做什麼') || msg.includes('提議') || msg.includes('去哪')) {
    if (latestMood === 'cool' || latestMood === 'good') {
      return `既然今天心情美美的，Pandimo 推薦你：\n1. 放學去麥當勞吃大薯加冰炫風 🍟\n2. 滑滑 Threads 看看搞笑脆文 📱\n3. 聽一首最愛的熱音社搖滾歌！`;
    } else if (latestMood === 'bad' || latestMood === 'awful' || msg.includes('爛透了') || msg.includes('難過')) {
      return `嗚嗚，今天辛苦你了 🥺 Pandimo 推薦你今天對自己好一點：\n1. 嚼一包哈瑞寶小熊軟糖，嚼碎所有不開心 🧸\n2. 洗個熱水澡，提早半小時上床躺平滑手機（但不要滑太晚喔）\n3. 聽一首溫柔的歌，對自己說聲「辛苦了」！`;
    } else {
      return `現在的你適合一次短暫的充電喔！建議可以喝杯手搖杯，或者趴在課桌上瞇個 10 分鐘，讓辛苦的大腦放假一下。`;
    }
  }

  if (msg.includes('爛透了') || msg.includes('傷心') || msg.includes('難過') || msg.includes('差勁') || msg.includes('焦慮')) {
    return `拍拍你，今天真的辛苦了...🥺 無論是考試考差、被家長唸，還是感情暈船不順，Pandimo 都會在這裡陪你。今晚要不要吃點零食，早點休息呢？給你一個大大的抱抱 🐼💗`;
  }

  return `聽你分享生活真好！寫字能幫我們把課業跟人際的煩惱都整理乾淨。無論是開心的日常還是碎碎唸，Pandimo 都會是最懂你的溫暖空間。今天學校有什麼八卦或好玩的事嗎？✍️`;
}

function showTypingIndicator() {
  const container = document.getElementById('chat-message-history');
  if (!container) return;

  const typingRow = document.createElement('div');
  typingRow.id = 'chat-typing-indicator';
  typingRow.className = 'chat-bubble-row bot';
  
  // Set avatar name based on mode
  const name = state.currentChatMode === 'volunteer' ? '天使' : '🐼';
  const style = state.currentChatMode === 'volunteer' ? 'background-color: var(--accent-light); color: var(--accent-dark);' : '';

  typingRow.innerHTML = `
    <div class="chat-avatar" style="${style}">${name}</div>
    <div class="chat-bubble typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;

  container.appendChild(typingRow);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('chat-typing-indicator');
  if (indicator) indicator.remove();
}

// Scanning student emotional distress keywords
const DISTRESS_KEYWORDS = [
  '想死', '消失', '撐不下去了', '崩潰', '撐不住', '好痛苦', '憂鬱症', 
  '自殺', '自殘', '沒有活著的意義', '不想活了', '想解脫', '非常難過', 
  '人生沒有意義', '好累想死', '絕望', '壓力太大受不了', '放棄人生'
];

function handleUserSendMessage() {
  const inputEl = document.getElementById('chat-msg-input');
  if (!inputEl) return;

  const text = inputEl.value.trim();
  if (!text) return;

  // Append user bubble
  appendChatBubble('user', text);
  inputEl.value = '';

  // Show typing indicator
  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    
    // Check if in volunteer mode
    if (state.currentChatMode === 'volunteer') {
      const volunteerReply = generateVolunteerReply(text);
      appendChatBubble('volunteer', volunteerReply);
      return;
    }

    // Check for extreme distress keywords in AI mode!
    const isDistressed = DISTRESS_KEYWORDS.some(kw => text.includes(kw));

    if (isDistressed) {
      // AI Companion steps up to trigger the crisis counseling matcher flow!
      triggerCounselingMatcherFlow();
    } else {
      // Standard AI supportive response
      const reply = generateBotReply(text);
      appendChatBubble('bot', reply);
    }
  }, 1200);
}

// Transition chat UI into Counselor/Volunteer Matcher
function triggerCounselingMatcherFlow() {
  const distressMsg = `
    <div style="background-color: var(--bg-tertiary); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 14px; margin: 10px 0; box-shadow: var(--shadow-sm);">
      <p style="font-weight: 700; color: var(--accent-dark); font-size: 13px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        💗 Pandimo 溫暖關懷通知
      </p>
      <p style="font-size: 12px; color: var(--text-primary); line-height: 1.6; margin-bottom: 12px;">
        Pandimo 注意到你現在可能正承受著沉重的心理壓力...（輕抱你）雖然我會一直在這裡聽你說，但我是一個 AI，無法代替真實的人情溫暖。
        <br><br>
        <strong>你願意讓專業的【線上匿名心理輔導志工】或【預約諮商師】陪你聊聊嗎？</strong> 整個連線過程全程匿名，並且絕對為您保密。
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button class="btn btn-accent" id="btn-match-volunteer" style="font-size:12px; padding:8px 12px; font-weight:700;">🌟 開啟匿名真人志工聊聊</button>
        <button class="btn btn-primary" id="btn-match-counselor" style="font-size:12px; padding:8px 12px; font-weight:700;">🌿 預約一對一心理諮商</button>
        <button class="btn btn-secondary" id="btn-match-decline" style="font-size:11px; padding:6px 12px;">我再想想，先跟 Pandimo 聊</button>
      </div>
    </div>
  `;

  appendChatBubble('bot', distressMsg, true);
  
  // Bind dynamic interactive action handlers
  setTimeout(() => {
    const volunteerBtn = document.getElementById('btn-match-volunteer');
    const counselorBtn = document.getElementById('btn-match-counselor');
    const declineBtn = document.getElementById('btn-match-decline');

    if (volunteerBtn) {
      volunteerBtn.addEventListener('click', () => {
        // Run matching animation
        volunteerBtn.disabled = true;
        volunteerBtn.innerHTML = '🔄 正在連線傾聽天使志工...';
        
        setTimeout(() => {
          state.currentChatMode = 'volunteer';
          state.save();
          
          appendChatBubble('bot', '<strong>連線成功！心理學系【小晴天使志工】已進入本安全對話區。🌸</strong>');
          
          showTypingIndicator();
          setTimeout(() => {
            removeTypingIndicator();
            appendChatBubble('volunteer', '嗨！我是小晴志工，在這邊看到你留下的文字。別怕，這裡是一個絕對保密且安全的樹洞，你願意跟我說說看發生了什麼事情嗎？我會一直溫柔陪伴你。❤️');
          }, 1500);
        }, 2000);
      });
    }

    if (counselorBtn) {
      counselorBtn.addEventListener('click', () => {
        alert('🌿 預約專人心理諮商：\n系統已連線至您的學校學生心理輔導室。稍後將有專業諮商輔導老師透過校內信件聯絡您，並為您排定免費諮商晤談。請您放心，此預約完全保密！❤️');
        appendChatBubble('bot', 'Pandimo 已幫您連線學生輔導中心預約申請！別擔心，老師們人都很好喔。在他們聯絡你之前，我隨時在這聽你傾訴。🍵');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        appendChatBubble('bot', '好的，Pandimo 會一直守候在你的手機裡，隨時隨地傾聽你。如果你覺得累了或想找人說說話，隨時點擊連線喔。來做個深呼吸吧，呼...吸... 🍃');
      });
    }
  }, 100);
}




// --- STORE PAGE LOGIC ---
function initStorePage() {}

function renderStore() {
  const container = document.getElementById('store-goods-grid');
  if (!container) return;

  container.innerHTML = '';

  DEFAULT_STORE_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'store-item-card';

    const isRedeemed = state.redeemedItems.includes(item.id);

    card.innerHTML = `
      <div class="store-item-image">
        <span>${item.icon}</span>
        <span class="store-item-badge">${item.limit}</span>
      </div>
      <div class="store-item-info">
        <h4 class="store-item-name">${item.name}</h4>
        <p class="store-item-desc">${item.desc}</p>
        <div class="store-item-action">
          <div class="store-item-price">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m9 11 3-3 3 3"/></svg>
            <span>${item.price}</span>
          </div>
          <button class="store-buy-btn ${isRedeemed ? 'redeemed' : ''}" 
                  data-id="${item.id}" 
                  data-price="${item.price}"
                  ${isRedeemed ? 'disabled' : ''}>
            ${isRedeemed ? '已兌換' : '兌換'}
          </button>
        </div>
      </div>
    `;

    const buyBtn = card.querySelector('.store-buy-btn');
    if (!isRedeemed) {
      buyBtn.addEventListener('click', () => {
        handleRedeemItem(item);
      });
    }

    container.appendChild(card);
  });
}

function handleRedeemItem(item) {
  if (state.points < item.price) {
    alert(`💡 積分不足！兌換「${item.name}」需要 ${item.price} 積分，而你目前只有 ${state.points} 積分喔。多寫日記或每日登入簽到，可以快速累積積分！💪`);
    return;
  }

  if (confirm(`確認花費 ${item.price} 積分兌換「${item.name}」嗎？`)) {
    const success = state.redeemItem(item.id, item.price);
    if (success) {
      updateAppHeaders();
      renderStore();
      
      const btn = document.querySelector(`.store-buy-btn[data-id="${item.id}"]`);
      if (btn) triggerCoinExplosion(btn);
      
      flashDynamicIsland(`🎉 成功兌換 ${item.name}！`);
      
      if (item.type === 'theme') {
        alert(`🎉 兌換成功！已經在您的裝扮庫中解鎖「${item.name}」裝扮。`);
      } else {
        alert(`🎉 兌換成功！【模擬快遞發送】「${item.name}」已申請發貨，預計兩日送達！`);
      }
    }
  }
}
