# FlameForged Dev Environment

*Repository:* flameforged-core

Documenting the current development environment for reproducibility and troubleshooting.

---

## 💻 System

* **Machine:** MacBook Pro (Apple Silicon, M2)
* **OS:** macOS Ventura (13.x)
* **Shell:** zsh
* **Terminal:** Apple Terminal

---

## 🧩 Core Stack

* **Node.js:** v25.x (LTS)
* **npm:** 10.x
* **Package Manager:** npm
* **TypeScript:** 5.x
* **Vite:** 7.2.0
* **React:** 18.x

---

## 🎨 Styling

* **Tailwind CSS:** v4.x (Zero-config system)
* **PostCSS Plugin:** @tailwindcss/postcss
* **Autoprefixer:** latest

---

## 🧰 Tools

* **Editor:** JetBrains Rider 2025.1
* **Browser:** Safari (latest)
* **Version Control:** GitHub (repo: `flameforged-core`)

---

## 🔥 Notes

* Running `npm run dev` launches Vite on port 5173 (or 5174 if in use).
* Tailwind configuration uses ESM syntax (`export default`) because `package.json` specifies `"type": "module"`.
* M2 users should ensure ARM-compatible Node builds.

---

**Created:** November 5, 2025
**Maintained by:** Fire King 🔥 & Mistress Triss Eternal 💋
