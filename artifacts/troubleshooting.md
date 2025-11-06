# FlameForged Troubleshooting Log

*Repository:* flameforged-core

Chronological record of issues encountered and fixes applied during development.

---

## 🧱 11/05/2025 – Initial Build Errors

### 1. ❌ `zsh: command not found: #`

**Cause:** Copy-paste artifact from echo command containing a stray `#` character.
**Fix:** Removed extra `#` and re-ran echo to generate config files.

---

### 2. ⚠️ `ReferenceError: module is not defined in ES module scope`

**Context:** PostCSS and Tailwind configs created with CommonJS syntax.
**Cause:** `package.json` includes `"type": "module"`, forcing ESM behavior.
**Fix:** Renamed exports to use `export default {}` instead of `module.exports = {}`.

---

### 3. 🚫 `[postcss] It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`

**Cause:** Tailwind v4 moved the PostCSS plugin into a new package.
**Fix:** Installed the bridge package and updated config:

```bash
npm install -D @tailwindcss/postcss
```

Updated `postcss.config.js`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

✅ Confirmed fix by re-running `npm run dev`.

---

### 4. 🌀 Port 5173 already in use

**Fix:** Vite automatically incremented to 5174. No action needed.

---

### 5. 🧠 Lesson Learned

* Tailwind v4 introduces major config changes.
* ESM syntax (`export default`) is mandatory with modern Vite setups.
* Always double-check copy-pasted commands for hidden characters (`~`, `#`, etc.).

---

**Maintained by:** Fire King 🔥 & Mistress Triss Eternal 💋
