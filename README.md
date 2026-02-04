# Bekjan Temenov - Personal Website

**Repository:** [GitHub](https://github.com/Bekjan-Temenov/WebApp-Bekzhan-Temenov)  
**Demo:** https://web-app-bekzhan-temenov.vercel.app

---

## About
Personal portfolio website for developer **Bekjan Temenov** showcasing skills, projects, and experience.

**Pages:** Home, Projects, Architecture, Contact  
**Tech Stack:** React + TypeScript + Vite + CSS/SCSS  
**State Management:** `useStore.ts`  
**CI/CD:** GitHub Actions

---

## Project Structure

/components - UI components
/pages - Website pages
/store - Application state
/types.ts - TypeScript types
/constants.ts - Project constants
App.tsx - Main component
index.tsx - Entry point
vite.config.ts - Vite config
.github/workflows/ci.yml - CI config


---

## Setup

```bash
# Clone repository
git clone https://github.com/Bekjan-Temenov/WebApp-Bekzhan-Temenov.git
cd WebApp-Bekzhan-Temenov

# Install dependencies
npm ci

# Run dev server
npm run dev

# Build for production
npm run build

# Lint & test
npm run lint
npm test
