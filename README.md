# Algorithmic Accountability & Transparency Dashboard

A single-page React prototype with a high-tech "Cyber-Audit" / Glass Box UI for algorithmic transparency.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Features

- **System Health Header** — Fairness Index (%), Bias Variance (Low/Med/High), Audit Status (Active)
- **Optimization Tuner** — Sliders for Profit vs. Social Well-being and Viral Reach vs. Fact-Check Strictness; both drive the header Fairness Index
- **Decision Engine Feed** — Mock social posts with "🔍 Algo Insight" toggles that expand Recommendation Logic Weights and Safety Risk progress bar
- **Transparency Analytics** — Demographic Reach bar chart and real-time Harm Detection Log
- **Audit Modal** — "Report Algorithmic Bias" form (Issue Type, Evidence)

## Push to GitHub (Hema3511)

1. **Create a new repository** on GitHub:
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `algorithmic-accountability-dashboard` (or `hackathon`)
   - Leave it empty (no README, .gitignore, or license).
   - Create the repository.

2. **From this folder, run** (in Git Bash or a terminal where `git` is installed):

   **Option A – use the script (Git Bash):**
   ```bash
   bash push-to-github.sh
   ```

   **Option B – use the script (Windows CMD):**
   ```cmd
   push-to-github.bat
   ```

   **Option C – manual commands:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Algorithmic Accountability Dashboard with 4 scenarios"
   git remote add origin https://github.com/Hema3511/algorithmic-accountability-dashboard.git
   git branch -M main
   git push -u origin main
   ```

   If you named the repo something else (e.g. `hackathon`), replace `algorithmic-accountability-dashboard` in the URL with your repo name.

## Stack

- React 18, TypeScript, Vite
- Tailwind CSS 4, Lucide React
