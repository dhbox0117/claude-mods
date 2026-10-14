# claude-mods

老闆自製的 Claude Code mod 集合。

| Mod | 說明 |
|---|---|
| [next-steps-app](./next-steps-app) | next-steps 跨介面版：每輪回答後建議最多三個下一步提示，手機 / VS Code 也能用 |

## 安裝

在終端機 session 的提示列輸入：

```
/plugin install next-steps-app --marketplace dhbox0117/claude-mods
```

接著輸入 `y` 新增 marketplace，再選擇 scope（建議 user）。

從 shell 安裝：

```bash
claude plugin install next-steps-app --marketplace dhbox0117/claude-mods
```

桌面 App（不支援 `/plugin` 指令）：點提示框旁的 **+** → **Plugins** → **Add marketplace**，輸入 `dhbox0117/claude-mods`，再按 **Add plugin**。

> 這是私人 repo：安裝的電腦需要先有 github.com 的 git 憑證（SSH key，或先執行 `gh auth login` 再執行 `gh auth setup-git`）。
