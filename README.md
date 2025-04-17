# 🔍 GitHub Profile Viewer

A sleek and minimal GitHub profile viewer built with:

- ⚡️ [Bun](https://bun.sh) — the super-fast JavaScript runtime
- 🧠 React + TypeScript — modern frontend stack
- 💅 [TailwindCSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com) — for styling
- 🌗 Dark mode toggle with Shadcn
- 🔁 Animated UI using [Framer Motion](https://www.framer.com/motion/)
- 📦 GitHub profile viewer with top and recent repos
- 🔍 Repo filtering and search by name and language
- 👁️ View All / Show Less toggles for expanded repo views
- ⏳ Modern icon spinner (Lucide `Loader`)
- 🧱 Header and Footer components
- 🐳 Deployable with Docker and Render

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/github-profile-viewer.git
cd github-profile-viewer
```

### 2. Install dependencies
```bash
bun install
```

### 3. Start the dev server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Docker Support

This app can be containerized and deployed anywhere using Docker.

### 🐳 Docker Build & Run
```bash
docker build -t github-profile-viewer .
docker run -p 3000:3000 github-profile-viewer
```
Then visit [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploying to Render

This project is set up to deploy as a **static web service** on [Render](https://render.com/):

- Make sure `.bun-version` is set to `1.2.9`
- Your `render.yaml` should include:

```yaml
services:
  - type: web
    name: github-viewer
    env: static
    buildCommand: bun install && bun run clean:build
    staticPublishPath: dist
    buildFilter:
      paths: ["src/**", "index.html", "build.ts"]
    envVars:
      - key: BUN_VERSION
        value: "1.2.9"
```

---

## ✨ Features
- 🔍 Search GitHub usernames
- 🧑 View avatar, name, bio, repo count, followers
- 📚 List top 5 public repos by stars
- 🕒 View 5 recently updated repositories
- 📖 View all repos with optional filtering by language and search
- 👁️ Toggle "View All" and "Show Less" for top and recent repos
- 🌗 Toggle between light/dark mode
- 🔄 Animated fade-in and scroll with Framer Motion
- ⏳ Spinner using Lucide `Loader` icon
- 🧱 Persistent header and footer layout

---

## 📁 Project Structure
```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── spinner.tsx
│   └── ThemeToggle.tsx
├── App.tsx
├── frontend.tsx
├── index.css
├── index.html
```

---

## 📦 Built With
- [Bun](https://bun.sh)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev)
- [GitHub REST API](https://docs.github.com/en/rest)

---

## 📜 License
MIT — free for personal & commercial use

---

> Built with 💻 + 🧠 + ☕ by Scidyllics
