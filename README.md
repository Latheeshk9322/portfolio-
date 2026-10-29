# Latheesh K. — Developer & IT Systems Portfolio 🚀

A high-performance, developer-themed portfolio website engineered with **React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis**.

![Version](https://img.shields.io/badge/version-2.5.0-cyan.svg)
![Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Theme](https://img.shields.io/badge/theme-Cyber%20Dark%20%2F%20Neon%20Cyan-06b6d4.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ⚡ Tech Stack & Architecture

- **Core Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling & Aesthetics:** [Tailwind CSS v3](https://tailwindcss.com/) with Cyber Dark palette, glassmorphism blur filters, dot-matrix blueprints, and glowing neon borders.
- **Motion & Scroll Sequences:**
  - [Framer Motion](https://www.framer.com/motion/) for component entrance transitions and `layoutId` shared-element project modal expansions.
  - [Lenis](https://github.com/darkroomengineering/lenis) for 60fps buttery-smooth scroll behavior.
  - Native HTML5 Canvas for real-time binary matrix code rain and celebratory developer confetti explosions.
- **Icons & Tooling:** [Lucide React](https://lucide.dev/) (tree-shaken SVG vector icons).
- **Single Source of Truth:** Centralized, fully typed data model in `src/data/portfolio.ts`.

---

## 🛠️ Quick Start (Run Locally)

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Installation
```bash
git clone https://github.com/Latheeshk9322/portfolio-.git
cd portfolio-
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates a zero-dependency, optimized static distribution in `dist/`, ready for 1-click deployment on **Vercel, Netlify, or GitHub Pages**.

---

## 📁 Project Directory Structure

```
portfolio/
├── public/
│   ├── assets/               # Latheesh_image.jpg, resume PDF, certificates c1-c7.jpg
│   ├── favicon.svg           # Developer <LK/> SVG favicon
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/           # CustomCursor.tsx, BuildProgressBar.tsx, MatrixBackground.tsx
│   │   ├── navigation/       # EditorTabBarNav.tsx, CommandPalette.tsx (Ctrl+K)
│   │   ├── project/          # ProjectModal.tsx (Shared-element layoutId IDE inspector)
│   │   └── terminal/         # InteractiveTerminal.tsx, BootLoader.tsx
│   ├── data/
│   │   └── portfolio.ts      # 100% Typed Single Source of Truth
│   ├── hooks/
│   │   ├── useHackerScramble.ts # Decryption scramble text effect
│   │   ├── useLenis.ts       # Smooth scroll controller
│   │   └── useTheme.ts       # Dark / Light theme persistence
│   ├── sections/
│   │   ├── HeroSection.tsx           # Terminal typing > whoami, rotating roles, download resume
│   │   ├── AboutSection.tsx          # VS Code JSON/TS bio view + professional attributes
│   │   ├── SkillsSection.tsx         # CLI npm install view + filling progress bars
│   │   ├── ExperienceSection.tsx     # Git commit history timeline with hash badges
│   │   ├── ProjectsSection.tsx       # 3D tilt cards, category filters, and award tags
│   │   ├── CertificationsSection.tsx # Lightbox gallery with SHA-256 verified previews
│   │   ├── TestimonialsSection.tsx   # Peer & mentor review carousel
│   │   ├── ContactSection.tsx        # Encrypted packet form + confetti explosion
│   │   └── FooterSection.tsx         # Easter egg terminal & branch build status
│   ├── types/
│   │   └── portfolio.ts      # TypeScript interfaces
│   ├── styles/
│   │   └── globals.css       # Tailwind directives & glow utilities
│   ├── App.tsx               # Root application layout
│   └── main.tsx              # React DOM entry point
├── index.html                # Modern Vite HTML entry with SEO & OpenGraph tags
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ✏️ How to Edit Content in `src/data/portfolio.ts`

All personal info, projects, skills, education, and credentials live in a single typed file: [src/data/portfolio.ts](file:///D:/Latheesh/portfolio/src/data/portfolio.ts).

### Adding or Updating a Project:
```ts
{
  id: "my-new-project",
  title: "AI Security Camera",
  subtitle: "Edge computer vision prototype",
  category: "iot", // 'web-dev' | 'ml-ai' | 'iot' | 'software'
  categoryLabel: "IoT / Embedded",
  description: "Short summary shown on the card...",
  fullOverview: "In-depth architecture description inside the IDE modal...",
  architectureDetails: ["Point 1", "Point 2"],
  features: ["Feature A", "Feature B"],
  techStack: ["React", "Python", "OpenCV"],
  githubUrl: "https://github.com/...",
  liveDemoUrl: "https://...",
  icon: "Video", // Lucide icon name
  codeSnippet: {
    filename: "detector.py",
    language: "python",
    code: `# Your key code snippet here`
  },
  fileTree: ["src/", "  ├── main.py", "README.md"]
}
```

### Updating Resume or Profile Picture:
- Drop your updated resume PDF into `public/assets/latheesh_k_resume.pdf` (or update `personal.resumePdf` in `portfolio.ts`).
- Drop your updated profile image into `public/assets/Latheesh_image.jpg` (or update `personal.profilePhoto` in `portfolio.ts`).

---

## 🎨 Where Each Animation Lives

| Animation | File Location | Description |
|---|---|---|
| **Terminal Typing (`> whoami`)** | `src/sections/HeroSection.tsx` | Types out `Latheesh K`, cycles through developer roles with a blinking cursor. |
| **Matrix Binary Rain** | `src/components/common/MatrixBackground.tsx` | Native Canvas stream of 0s, 1s, and hex tokens; pauses when scrolled off-screen. |
| **Build Progress Bar** | `src/components/common/BuildProgressBar.tsx` | Top viewport bar tracking scroll depth: `BUILD: 65% [=====>  ]`. |
| **Hacker Scramble Decrypt** | `src/hooks/useHackerScramble.ts` | Decrypts headings into plain text upon entering viewport. |
| **VS Code JSON Bio** | `src/sections/AboutSection.tsx` | Displays bio as a syntax-highlighted TypeScript object with line numbers and copy button. |
| **CLI Skills Install** | `src/sections/SkillsSection.tsx` | Displays `npm install @latheesh/tech-stack` with animated filling percentage bars. |
| **Git Commit Timeline** | `src/sections/ExperienceSection.tsx` | Commit node tree with commit hashes (`c0mm1t_mca25`), branches, and dates. |
| **Project Expansion Modal** | `src/components/project/ProjectModal.tsx` | Framer Motion `layoutId` shared-element transition into a multi-tab IDE window (`README.md`, `snippet.code`, `file-tree.dir`, `stack.json`) with a 0.9s boot sequence. |
| **Command Palette (`Ctrl+K`)** | `src/components/navigation/CommandPalette.tsx` | Keyboard-driven instant jump to any section, project, or action. |
| **Interactive Terminal Shell** | `src/components/terminal/InteractiveTerminal.tsx` | Fullscreen CLI shell supporting `whoami`, `skills`, `projects`, `education`, `contact`, `resume`. |
| **Confetti Explosion** | `src/sections/ContactSection.tsx` | Canvas confetti blast upon submitting the encrypted contact form. |

---

## 🚀 Deployment

### Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify:
```bash
npm run build
# Drag & drop the `dist` folder into Netlify Drop, or connect via GitHub
```

### Deploy to GitHub Pages:
Set `base: '/portfolio-/'` in `vite.config.ts`, run `npm run build`, and push the `dist/` branch to `gh-pages`.

---

## 📄 License
MIT © 2026 [Latheesh K.](https://github.com/Latheeshk9322/portfolio-)
