# Manual Test Results

> Run these tests by opening `index.html` directly in a browser.  
> Mark each item `[x]` when passing, `[!]` when failing (note the actual result).

---

## Arithmetic

- [x] 2 + 3 = 5
- [x] 10 − 4 = 6
- [x] 3 × 7 = 21
- [x] 20 ÷ 4 = 5
- [x] 1.5 × 4 = 6
- [x] 100 ÷ 8 = 12.5

---

## Edge Cases

- [x] **Division by zero** — `10 ÷ 0` → displays `Error: / by 0` in red; app does not crash
- [x] **Floating-point fix** — `0.1 + 0.2` → displays `0.3` (not `0.30000000000000004`)
- [x] **Leading zero prevention** — type `0` then `7` → displays `7`, not `07`
- [x] **Double decimal prevention** — type `3`, `.`, `1`, `.` → stays `3.1`
- [x] **Equals with no operator** — press `=` alone → no crash, display unchanged
- [x] **Repeated equals** — press `=` several times after a result → no chaining or crash
- [x] **Negative toggle from positive** — `5`, `+/-` → `-5`
- [x] **Negative toggle from negative** — `-5`, `+/-` → `5`
- [x] **Operator chaining** — `5 + 3 ×` → resolves `5+3=8` first, then begins `8 ×`
- [x] **Operator swap** — `5 +`, then immediately `×` before typing a number → operator updates without a double-calculate
- [x] **Long number display** — type 16 digits → font shrinks automatically, no layout break
- [x] **Decimal after equals** — calculate result, then press `.` → starts `0.` correctly

---

## Keyboard

- [x] Number keys `0`–`9` append/replace digits correctly
- [x] `+` key → Add operator
- [x] `-` key → Subtract operator (maps to internal `−`)
- [x] `*` key → Multiply operator
- [x] `/` key → Divide operator; **browser find-in-page is suppressed**
- [x] `Enter` key → triggers equals / calculate
- [x] `=` key → triggers equals / calculate
- [x] `.` key → inserts decimal point (respects double-decimal guard)
- [x] `,` key → also inserts decimal (European layout support)
- [x] `Backspace` key → deletes last character; falls back to `0` when empty
- [x] `Escape` key → clears all (AC)
- [x] `p` / `P` key → percentage
- [x] `n` / `N` key → toggle sign
- [x] Keyboard buttons **flash** the matching on-screen button as visual feedback
- [x] `Ctrl+R` (and other browser shortcuts) **not** intercepted

---

## History Panel

- [x] Panel shows at most **5 entries**
- [x] Most recent calculation appears at the **top** of the list
- [x] Each entry formatted as `expression = result` (e.g. `5 + 3 = 8`)
- [x] Error results **not** stored in history
- [x] History updates immediately after pressing `=` or `Enter`
- [x] Entries survive operator chaining (shows each resolved step)

---

## Display

- [x] Expression line (small, faded) shows pending operation e.g. `12 ÷`
- [x] Expression line clears after equals
- [x] Result line is large and bold for normal numbers
- [x] Error text is **red** and at a smaller font size (`1.6rem`)
- [x] Auto-shrink: font reduces for numbers > 9 chars, > 12 chars, > 15 chars

---

## Responsive Layout

- [x] **Desktop 1280px** — calculator centred, all buttons visible, correct spacing
- [x] **Tablet 768px** — calculator still fits and is centred
- [x] **Mobile 480px** — `--btn-size: 70px`, wrapper `320px` wide, no horizontal scroll
- [x] **Mobile 380px** — `--btn-size: 62px`, wrapper `290px` wide, no horizontal scroll
- [x] **Mobile 320px** — fits within viewport without overflow or cut-off buttons

---

## Accessibility

- [x] All buttons have `aria-label` attributes for screen readers
- [x] `#result` has `aria-live="assertive"` for immediate announcement
- [x] `.history-panel` has `aria-live="polite"` for non-interruptive history updates
- [x] App usable via keyboard alone (no mouse required)

---

