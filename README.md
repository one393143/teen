# 📱 心晴日記 (Mood Tracker) - 手機 APP 高保真原型框架

這是一個為**心情日記、情緒護理與生活習慣打卡**設計的手機 APP 原型框架。其核心對標熱門日記 App **Daylio**，並融入了精緻的**漸層色面板、動態島硬體模擬器與豐富的趣味遊戲化積分體系**。

---

## ✨ 核心設計特點

1. ⚡ **零依賴・雙擊即測**：
   - 考慮到您的電腦目前可能尚未配備 Node.js / npm 環境，本專案採用**純 HTML5 + CSS3 + ES6 原生 JavaScript** 構建。
   - **無需執行任何安裝命令**！您只需**在電腦上直接雙擊打開 `index.html`**，即可在 Chrome / Safari 等任意瀏覽器中以 100% 完整互動的方式運行與測試所有功能！
2. 📱 **雙重顯示模式 (手機模擬器 vs. 滿版 App)**：
   - **在電腦寬螢幕開啟**：螢幕中央會顯示一隻高質感的實體手機外框（配備流暢的動態島、即時更新的手機狀態列時間/電量），左側配備控制面板，供您動態修改 App 名稱、切換深/淺外觀、一鍵注入測試數據等。
   - **在手機開啟或打包後**：模擬器外殼會自動適應並隱藏，App 會 100% 自動滿版顯示，適配所有 iPhone 與 Android 螢幕比例。
3. 📊 **極致還原的數據圖表**：
   - **心情日曆**：以可愛的心情表情符號（超棒、良好、沒特別、不佳、糟糕）標記每一天的心情。
   - **Mood Statistics (柱狀圖)**、**Mood Percentage (甜甜圈圖)**、**Diary Statistics (連續打卡統計)**：純 CSS 與動態 SVG 繪製，畫面極具美感，支持即時數據互動。
4. 🤖 **智慧聊聊伴侶與商城系統**：
   - **聊聊**：AI 伴侶「晴晴」會根據您今天記錄的心情，提供最溫柔的客製化文字回應、生活提議。
   - **商城**：寫日記可賺取「心情積分」，積分能即時兌換 APP 皮膚主題、貼紙包和模擬自愈小物，並伴隨流暢的金幣噴發動畫。

---

## 🚀 快速開始測試

### 1. 電腦網頁測試（零安裝）
- 直接在檔案總管中，點擊並打開 **[index.html](file:///Users/spoon/Projects/teen/index.html)** 檔案即可！
- **強烈推薦**：在左側控制面板中點擊 **「⚡ 注入模擬日記」**，系統將自動寫入 15 天豐富多樣的心情與活動日誌，您能立刻預覽統計圖表的震撼動態效果！

---

## 📦 打包成 iOS 與 Android 手機 APP 下載指南

專案已預先寫好 `capacitor.config.json` 配置。當您在電腦安裝好 Node.js 後，僅需透過終端機執行以下簡單步驟，即可編譯成原生手機 App：

### 步驟 1：安裝 Capacitor 工具鏈
在專案根目錄 `/Users/spoon/Projects/teen` 下運行命令：
```bash
# 安裝 Capacitor 命令核心
npm install @capacitor/core @capacitor/cli
```

### 步驟 2：初始化 App 原生配置
```bash
# 初始化 App 套件包設定 (使用當前目錄作為網頁靜態資源庫)
npx cap init "請輸入名稱" "com.teen.moodtracker" --web-dir=.
```

### 步驟 3：安裝 iOS 與 Android 原生平台擴充
```bash
# 安裝原生編譯依賴
npm install @capacitor/android @capacitor/ios

# 建立 Android 與 iOS 的專案資料夾
npx cap add android
npx cap add ios
```

### 步驟 4：將代碼同步至手機專案
未來只要您修改了網頁上的 `index.html`、`src/style.css` 或 `src/app.js`，只需執行此同步命令即可將最新修改導入原生專案中：
```bash
npx cap sync
```

### 步驟 5：使用 Xcode 或 Android Studio 編譯下載
```bash
# 開啟 Xcode (進行 iOS 打包與 iPhone 真機調試)
npx cap open ios

# 開啟 Android Studio (編譯 Android APK 與模擬器測試)
npx cap open android
```

---

## 📂 檔案目錄結構

- 📄 **[index.html](file:///Users/spoon/Projects/teen/index.html)**：首頁結構，定義了手機模擬器、控制台以及 4 大分頁（日記、文章、聊聊、商城）。
- 🎨 **[src/style.css](file:///Users/spoon/Projects/teen/src/style.css)**：設計系統與視覺核心，包含色彩變量、深色/淺色主題支持、玻璃擬物化、CSS 圖表結構與流暢微動畫。
- ⚙️ **[src/app.js](file:///Users/spoon/Projects/teen/src/app.js)**：核心邏輯，掌管本機 `localStorage` 數據儲存、日曆生成、SVG 圖表比例運算、模擬 AI 對話匹配和積分購物邏輯。
- ⚙️ **[capacitor.config.json](file:///Users/spoon/Projects/teen/capacitor.config.json)**：Capacitor 編譯配置文件。
