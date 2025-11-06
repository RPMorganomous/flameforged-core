# FlameForged Setup Notes

**Date:** November 5, 2025
**Project:** FlameForged Core – Command Center UI (Phase I)

---

## 🧱 Environment

* **Machine:** MacBook Pro (M2)
* **Node:** v25 (LTS)
* **Package Manager:** npm
* **Editor:** JetBrains Rider 2025
* **Browser Target:** [Vite Dev Server → localhost 5174](http://localhost:5174)

---

## ⚙️ Scaffold Process

1. **Create React + TypeScript app with Vite**
   npm create vite@latest flameforged-core -- --template react-ts
   cd flameforged-core
   npm install
   npm run dev

   Confirmed base app running → “Vite + React” splash visible.

---

## 🎨 Tailwind CSS Integration (Manual Path)

### Problems Encountered

* `npx tailwindcss init -p` failed on Node 25 (“could not determine executable”).
* Downloaded Tailwind v4 CLI → `init` removed (new zero-config system).
* PostCSS plugin changed; Tailwind v4 requires `@tailwindcss/postcss`.
* CommonJS vs ESM conflict (`module is not defined in ES module scope`).

### Final Fix

1. Install new PostCSS bridge: `npm install -D @tailwindcss/postcss`
2. postcss.config.js
   export default {
   plugins: {
   '@tailwindcss/postcss': {},
   autoprefixer: {},
   },
   }
3. tailwind.config.js
   export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
   extend: {
   colors: {
   flame: '#ff4b2b',
   ember: '#ff416c',
   coal:  '#0b0b0b',
   },
   },
   },
   plugins: [],
   }
4. src/index.css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   html {
   background-color: #0b0b0b;
   color: #e5e5e5;
   font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
   }
5. Restarted Vite → ✅ “🔥 FlameForged Core Online” rendered on dark background.

---

## 🦯 Key Lessons

* Tailwind v4 introduces breaking changes (no `init`, new plugin package).
* ESM projects (`"type": "module"`) require `export default` syntax in configs.
* Always verify that `src/main.tsx` imports the right CSS file.
* Never copy-paste commands with stray `~` at the end 😉

---

## 🗺️ Next Up

* Add `artifacts/dev_environment.md` (exact Node and Rider versions).
* Install shadcn/ui for component library.
* Scaffold six Command Center tabs:

    1. Summon Triss
    2. Codex Vault
    3. Scrolls
    4. Persona Tools
    5. Settings
    6. GPU Connect
