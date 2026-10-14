# next-steps-app

next-steps（MIT, Thariq Shihipar）的跨介面版。每輪回答後提供最多三個「下一步」提示，點選後填入輸入框成為草稿，**不會自動送出**。

## 與原版差異

| 項目 | 原版 next-steps | next-steps-app |
|---|---|---|
| 終端機 / 桌面 App | 輸入框上方的帶狀區 | 同原版 |
| 手機 / VS Code | 不顯示 | 自動開啟「Next steps」面板 |
| 點選後填入失敗 | toast 錯誤訊息 | 改為複製到剪貼簿；若仍失敗，用 toast 顯示完整提示 |
| 建議語言 | 多半是英文 | 跟隨對話語言（繁中對話會產生繁中建議） |
| 重新叫出建議 | 無 | `/next-steps` 指令 |
| 中途接上手機 | — | 若當下有建議，會補開面板 |

## 選項

| 選項 | 預設 | 說明 |
|---|---|---|
| `minAnswerChars` | 80 | 回答短於此字數時不產生建議 |
| `suggestSkills` | true | 建議可以直接帶出您的 slash 指令 / skill |
| `alwaysPane` | false | 所有介面一律使用面板，不使用帶狀區 |

## 安裝

```
/plugin install next-steps-app --marketplace dhbox0117/claude-mods
```

開發模式（從資料夾直接載入）：`claude --plugin-dir ./next-steps-app`

## 檢查

```bash
claude plugin validate ./next-steps-app
claude plugin test ./next-steps-app
```
