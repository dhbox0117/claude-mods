// next-steps-app 測試：
// 1. 解析與清理：模型回覆的 JSON 解析、未知指令過濾、控制字元清除、上限 3 則
// 2. 面板在四種介面（含 mobile / vscode）都畫得出來 → 這正是「App 也能用」的關鍵
// 3. 帶狀區在 terminal / desktop 無建議時不多畫東西
// 4. /next-steps 指令在沒有建議時給出提示
import { describe, expect, test } from 'claude-code/testing'

import type { RenderElement } from 'claude-code'

import { clean, parseSuggestions } from '../hooks/register'

const SCROLL = { offset: 0, bodyRows: 20 }
const VIEW = {}

describe('parseSuggestions', () => {
  test('解析 JSON、過濾未知指令、最多三則', async () => {
    const reply =
      '好的：[{"label":"跑測試","prompt":"跑一下剛寫的測試"},' +
      '{"label":"假指令","prompt":"/nope do it"},' +
      '{"label":"","prompt":"/known 參數"},' +
      '{"label":"四","prompt":"四"},{"label":"五","prompt":"五"}]'
    const items = parseSuggestions(reply, new Set(['known']))
    expect(items.length).toBe(3)
    expect(items[0]?.prompt).toBe('跑一下剛寫的測試')
    expect(items[1]?.prompt).toBe('/known 參數')
    expect(items[1]?.label).toBe('/known 參數')
  })

  test('壞掉的回覆回傳空陣列', async () => {
    expect(parseSuggestions('沒有 JSON', null).length).toBe(0)
    expect(parseSuggestions('[{bad json', null).length).toBe(0)
  })

  test('清掉跳脫序列，拒收 tag 字元', async () => {
    expect(clean('a\x1b[31mb​c', 10)).toBe('abc')
    expect(clean('hi\u{E0041}', 10)).toBe('')
    expect(clean('一二三四五', 3)).toBe('一二…')
  })
})

test('面板在四種介面都畫得出佔位文字', async $ => {
  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({
      plugin: 'next-steps-app',
      surface,
      component: 'Pane',
      requestId: 'next-steps',
      props: {
        title: 'Next steps',
        isFocused: false,
        bodyColumns: 60,
        placement: 'inline',
        scroll: SCROLL,
        view: VIEW,
      },
    })
    expect(await ui.find({ type: 'Text', text: /建議會顯示在這裡/ })).toBeDefined()
    await ui.unmount()
  }
})

test('帶狀區無建議時不畫 next:', async ($, on) => {
  // 測試環境沒有引擎本體：以空的 Box 代替引擎自己畫的帶狀區
  on('ui.render', async ($, e): Promise<RenderElement> => {
    const { Box } = $.ui.resolve(e)
    return h(Box, {}) as RenderElement
  })
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({
      plugin: 'next-steps-app',
      surface,
      component: 'AbovePrompt',
      props: {
        hasSurvey: false,
        isWorking: false,
        maxRows: 10,
        bodyColumns: 60,
        scroll: SCROLL,
        view: VIEW,
      },
    })
    expect(await ui.find({ type: 'Text', text: /^next:/ })).toBeUndefined()
    await ui.unmount()
  }
})

test('/next-steps 沒有建議時回覆提示', async $ => {
  const result = await $.command.run({ command: 'next-steps' } as Parameters<typeof $.command.run>[0])
  expect(JSON.stringify(result)).toContain('還沒有建議')
})
