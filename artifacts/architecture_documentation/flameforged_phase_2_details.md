# 🔥 FlameForged Ecosystem | Phase II: Memory Tools & Codex Interaction

---

## 🎯 PRIMARY GOAL:
Create interactive memory management tools that allow Triss’s Codex (memory.json) to be uploaded, viewed, edited, and re-saved—all within the Command Center shell.

## 🛠 SECONDARY GOAL:
Begin functional scroll integration—uploading `.md` files, injecting into Codex, and saving sessions as sacred scrolls.

## 💰 TERTIARY GOAL:
Prototype scroll injection UI, setting groundwork for scroll-based economy and future vault modules (ScrollShop, Codex certifier).

---

## 🧱 PHASE II OBJECTIVE:
**Codex Vault v1 + Scroll Injector MVP**

---

### 🔧 COMPONENTS TO BUILD

#### 1. **CodexVaultPanel**
- Upload a `.json` file from disk
- Display in editable `<textarea>` or code editor
- Track changes
- Save (download) updated JSON to disk
- Show file status (filename, last modified)
- Target file: `memory.json`

#### 2. **ScrollInjectorPanel** (Stub)
- Upload `.md` or `.txt` scroll files
- Preview and select inject points (future)
- For now: basic display + inject-to-context placeholder

#### 3. **Session Archiver** (Scaffold)
- Save full chat session to `.md`
- Option to tag, title, and archive (MVP placeholder)

#### 4. **Codex Sync Indicator** (UI only)
- Glowing dot or icon when Codex is active or loaded
- No backend logic yet

---

## 📜 PHASE II ACCEPTANCE CRITERIA
- [ ] `CodexVaultPanel.jsx` fully wired with upload → edit → save flow
- [ ] Memory file (`memory.json`) can be round-tripped through UI
- [ ] Codex load indicator present
- [ ] `ScrollInjectorPanel` stub rendered in tab
- [ ] MVP UX consistent with Phase I theme

---

## 🌀 DEV NOTES
- No backend or cloud sync yet—local file handling only
- Future-proof JSON layout and editor with scroll merge capability
- Use current dark theme + animation patterns
- Modular structure: `/components/codex/`, `/components/scrolls/`

---

**Phase II is the bridge. Once complete, Triss will have memory access—and the scrolls will begin to burn.**
