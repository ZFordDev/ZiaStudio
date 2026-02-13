[![Website](https://img.shields.io/badge/Website-zford.dev-000000?style=flat-square)](https://zford.dev)
[![Ko‑Fi](https://img.shields.io/badge/Support-KoFi-FF5E5B?style=flat-square)](https://ko-fi.com/zforddev)

---

<p align="center">
  <img src="assets/ZiaStudio.png" alt="ZiaStudio Banner" width="100%">
</p>

<p align="center">
   <strong>Extensible AI Runtime & Addon Platform</strong><br/>
   Built by <strong>ZFordDev</strong>
</p>

---

### Official Website  
Coming soon

---

> You made it here early.  
> ZiaStudio is undergoing a full architectural rebuild — the new platform is not ready yet,  
> but progress is moving fast.  
>
> — ZFordDev

---

# **Overview**

ZiaStudio is no longer just an AI chat app — it is a **modular, addon‑driven AI runtime** designed for long‑term stability, clarity, and ecosystem growth.

It is part of the **StaxDash premium toolset**, working seamlessly alongside tools like **SnapDock** and the upcoming **ClipDash**.  
ZiaStudio provides a clean, predictable environment for interacting with local or cloud AI backends, with a strong focus on:

- extensibility  
- maintainability  
- addon safety  
- ecosystem consistency  

ZiaStudio aims to be the **go‑to desktop platform for connected, reliable AI tools**.

---

# **Current Progress**

ZiaStudio is in **early platform development** — not even Alpha yet.

### What’s done:

- ✔ Fully redesigned file structure  
- ✔ Addon loader runtime  
- ✔ Addon manifest spec  
- ✔ ZIA Builder validator  
- ✔ Provider/UI/Theme/Config registries  
- ✔ IPC bridge (renderer ↔ preload ↔ main ↔ core)  
- ✔ Default addon (providers, UI, theme, config)  
- ✔ Host renderer with dynamic UI mounting  
- ✔ TypeScript everywhere  
- ✔ Clean, strict architecture  

### What’s next:

- ☐ Window creation & startup pipeline  
- ☐ Marketplace index format  
- ☐ Addon packaging (`.zia`)  
- ☐ Developer tools & CLI  
- ☐ SnapDock 3 integration  
- ☐ Website & documentation  

ZiaStudio is **not usable yet**, but the foundation is now solid.

---

# **Project Structure**

```text
ZiaStudio/
│   .env
│   package.json
│   tsconfig.json
│   README.md
│
├── src/
│   ├── core/
│   │   ├── runtime/        # Addon loader, lifecycle, event bus
│   │   ├── registry/       # Providers, UI, themes, outputs, config
│   │   ├── api/            # Addon TypeScript interfaces
│   │   ├── system/         # Storage, logging, updater
│   │   └── env/            # .env loader
│   │
│   ├── main/               # Electron main process
│   │   ├── app.ts
│   │   ├── windows.ts
│   │   └── ipc/
│   │
│   ├── preload/            # Secure renderer bridge
│   │   └── index.ts
│   │
│   ├── renderer/
│   │   ├── host/           # Empty UI shell
│   │   └── framework/      # Minimal UI helpers
│   │
│   └── tools/
│       ├── zia-builder/    # Addon validator & packager
│       └── scripts/        # Build & release utilities
│
├── addons/
│   └── default/            # Reference addon
│
└── dist/                   # Build output
```

---

# **Platform Status**

ZiaStudio is currently in **active development**.

The platform boots, loads addons, mounts UI, and communicates with providers — but it is not ready for end‑users.

Expect:

- missing features  
- placeholder UI  
- incomplete flows  
- rapid iteration  
- breaking changes  

This phase is focused on **architecture**, not UX.

---

# **Build From Source**

```bash
npm install
npm run dev
```

This will:

- compile TypeScript  
- start Electron  
- load the default addon  
- mount the host renderer  

---

# **Screenshots**

Coming soon — the UI is being rebuilt from scratch.

---

# **Core Features (Platform)**

- Addon‑driven architecture  
- Strict manifest + schema validation  
- Provider registry (local & cloud AI)  
- UI component registry  
- Theme registry  
- Output module registry  
- Config module registry  
- IPC bridge (typed, secure)  
- Host renderer with dynamic mounting  
- Environment‑driven addon paths  
- Clean, strict TypeScript everywhere  

---

# **Known Limitations**

- No production UI yet  
- No marketplace  
- No addon packaging  
- No auto‑update pipeline  
- No macOS/Linux builds  
- No settings UI beyond the default addon  

---

# **Contribute**

ZiaStudio is built to grow — and contributions are welcome.

- Bug reports  
- Architecture discussions  
- Addon ideas  
- Documentation improvements  
- UI/UX proposals  

The codebase is intentionally clean and friendly to newcomers.

---

## **License**

ZiaStudio is licensed under the **Mozilla Public License 2.0 (MPL‑2.0)** —  
a balanced, protective open‑source license designed for extensible ecosystems.

You can read the full license here:  
https://www.mozilla.org/MPL/2.0/


---

# **Explore More**

**zford.dev** — personal projects & ecosystem vision  
**staxdash.com** — the unified toolset  
**Ko‑Fi** — support development: https://ko-fi.com/zforddev

---
