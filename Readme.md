# Calculator App

> A clean, iOS-inspired calculator built with **HTML5, CSS3, and Vanilla JavaScript**.  
> No frameworks. No libraries. No build step — just open `index.html`.

---

## ✨ Features

| Feature | Details |
|---|---|
| **iOS Dark Theme** | Faithful to the iOS Calculator aesthetic — charcoal buttons, orange operators, deep-dark background |
| **Full Arithmetic** | Addition, subtraction, multiplication, division |
| **Operator Chaining** | `5 + 3 ×` resolves `5+3=8` first, then starts `8 ×` |
| **Floating-Point Fix** | `0.1 + 0.2` returns `0.3` — not `0.30000000000000004` |
| **Error Handling** | Division by zero shows `Error: / by 0` in red; app stays stable |
| **Calculation History** | Last 5 calculations shown above the display, most recent first |
| **Keyboard Support** | Full keyboard input — digits, operators, Enter, Backspace, Escape, and bonus `p`/`n` shortcuts |
| **Responsive Design** | Scales down gracefully at 480 px and 380 px breakpoints |
| **Accessible** | Semantic HTML5, ARIA roles, `aria-live` regions, full keyboard navigation |
| **Auto Font Shrink** | Long numbers reduce font size instead of overflowing |
| **Visual Feedback** | Active operator highlighted; keyboard presses flash the matching button |

---

## 📁 File Structure

```
calculator-app/
├── index.html                 ← Single HTML page (entry point)
├── css/
│   ├── style.css              ← Global resets, CSS variables, body layout
│   └── calculator.css         ← Calculator component, grid, buttons, responsive
├── js/
│   ├── calculator.js          ← All arithmetic logic & state (zero DOM access)
│   ├── display.js             ← All DOM updates (reads from Calculator)
│   ├── history.js             ← Last-5-calculations panel logic
│   └── keyboard.js            ← Keyboard → Calculator method mapping
├── tests/
│   └── TESTING.md             ← Manual test checklist with pass/fail results
└── README.md                  ← This file
```

### Module Responsibilities

```
┌─────────────────────────────────────────────────────┐
│                    index.html                        │
│  (HTML structure, button onclick, script load order) │
└──────────────┬──────────────────────────────────────┘
               │ loads (in order)
   ┌───────────▼──────────┐
   │    calculator.js      │  ← Pure logic. No DOM.
   │   (state + math)      │
   └───────────┬───────────┘
               │ called by
   ┌───────────▼──────────┐   ┌───────────────────────┐
   │     display.js        │   │      history.js        │
   │  (DOM: #result,       │   │  (DOM: .history-list)  │
   │   #expression)        │   └───────────────────────┘
   └───────────────────────┘
               ▲
   ┌───────────┴──────────┐
   │     keyboard.js       │  ← Glue layer: keydown → Calculator.*
   └───────────────────────┘
```

---

## 🚀 How to Run

1. **Clone or download** this repository.
2. **Double-click** `index.html` (or drag it into any modern browser).
3. That's it — no server, no build, no `npm install`.

### Browser Compatibility
Works in all modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `0` – `9` | Enter digit |
| `+` | Add |
| `-` | Subtract |
| `*` | Multiply |
| `/` | Divide (browser find-in-page suppressed) |
| `Enter` or `=` | Calculate result |
| `.` or `,` | Decimal point |
| `Backspace` | Delete last character |
| `Escape` | All Clear (AC) |
| `p` / `P` | Percentage |
| `n` / `N` | Toggle positive / negative |

---

## 🎨 Theming

All visual tokens are CSS custom properties in `:root` inside `css/style.css`.  
To retheme the calculator, **only change the values in `:root`** — never touch other selectors.

```css
:root {
  --bg-page:         #1c1c1e;   /* Page background  */
  --calculator-bg:   #2c2c2e;   /* Calculator card  */
  --btn-operator-bg: #ff9f0a;   /* Orange operators */
  /* … see style.css for the full list … */
}
```

---

## 🧪 Testing

Open [`tests/TESTING.md`](tests/TESTING.md) for the full manual test checklist.  
All test cases are pre-filled with expected results — mark them as you verify.

---

## 👥 Team

| Role | Responsibility |
|---|---|
| Developer A | `calculator.js` — arithmetic engine & state |
| Developer B | `display.js`, `history.js` — DOM layer |
| Developer C | `keyboard.js`, CSS — input handling & design |


