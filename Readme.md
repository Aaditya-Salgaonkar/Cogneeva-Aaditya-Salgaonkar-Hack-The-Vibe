# 🚀 SaaS MVP Builder – AI-Powered Startup Generator

*Submission for: Hack The Vibe 2025 (SaaS Domain)*  
*Built by: Aaditya Salgaonkar*  
*Duration: 48 hours solo build*

---

## 🧩 The Problem We're Solving

Every year, thousands of startup ideas die young — not because they're bad ideas, but because founders lack the technical skills or resources to execute.

- Hiring developers is expensive.
- Building MVPs takes weeks (or months).
- No-code tools are limited or require technical know-how.
- The startup ecosystem has a massive **"execution gap"**.

---

## 💡 Our Solution: Zero-to-MVP in Minutes

I built a full-stack AI-powered platform that allows any founder to simply describe their idea in natural language — and receive a **fully functional, production-ready SaaS MVP** within minutes.

**No coding. No teams. No blockers. Just describe your startup idea.**

---

## 🔥 Core Features

### 🚀 Natural Language → SaaS MVP Generator

- Enter any startup idea as a simple text prompt.
- The AI engine understands the intent and generates:
  - Responsive landing page
  - Full authentication system (via Supabase)
  - Database schema and tables
  - REST API routes and server logic
  - Frontend components (TailwindCSS-based UI)
  - Full folder structure, configs, and package management

### 🤖 AI Engine: Personalized Model Orchestration

- Powered by **Mistral 8x7B Instruct** via **OpenRouter API**
- Sophisticated prompt engineering splits complex requests into multiple tasks for highly detailed file structures
- Smart code scaffolding with full-stack separation

### 🖥 Complete Code Management

- Download complete codebase as a **ZIP file**
- Push directly to **GitHub repositories** with auto-created repos
- Deploy instantly to **Netlify** with one-click deployment

### 📊 MVP Analytics Dashboard

- Monitor all MVPs generated
- View:
  - Live deployment status (Testing, Live, Deployed)
  - Generation timestamps
  - Token usage & model efficiency
  - Revenue estimation & monetization projections

### 👤 Account Management

- Supabase-powered authentication (email provider)
- Clean profile page showing name, email, and avatar

### 🔬 Future-Proof AI Lab (Coming Soon)

- Fine-tune models, configure temperature/tokens, and engineer prompts for more advanced customization.
- Scalable design for enterprise-level AI prompt engines.

---

## ⚙️ Tech Stack

| Layer          | Stack |
| -------------- | ----- |
| Frontend       | Next.js 14 (App Router, Server Components) |
| Backend        | Node.js + Express |
| Database/Auth  | Supabase (Postgres, Auth, Storage) |
| AI Model       | OpenRouter API + Mistral 8x7B Instruct |
| Styling        | TailwindCSS |
| Deployment     | GitHub API + Netlify API |
| Storage        | Supabase Storage |
| Local          | Frontend on `localhost:3000`<br>Backend on `localhost:5000` |
| Hosting        | Frontend on Vercel and backend on Render
---

## 🧪 Technical Highlights

✅ Multi-prompt chunked orchestration using LLMs  
✅ True full-stack AI code generation  
✅ Live GitHub repo creation and auto-commit  
✅ Netlify deployment integration  
✅ Authentication with Supabase email provider  
✅ Downloadable ZIP file of full codebase  
✅ Fully operational dashboard to monitor builds  
✅ Backend-first architecture for future enterprise scalability

---

## 📈 Startup Potential

**The long-term vision: SaaS-as-a-Service**

- Democratizes SaaS startup creation for non-technical founders
- Productizable as a subscription SaaS tool for solopreneurs and incubators
- Can expand into:
  - Internal rapid prototyping tools for enterprises
  - AI-powered CTO assistant for VC-backed founders
  - SaaS starter kits marketplace

💸 Potential monetization:

- AI token billing based on usage
- Tiered SaaS subscriptions
- Paid model template marketplace
- GitHub & Netlify premium integrations

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- Supabase account with project & API keys
- OpenRouter API key
- GitHub personal token
- Netlify personal token

### Clone Repository
git clone https://github.com/Aaditya-Salgaonkar/hack-the-vibe-platform.git
cd hack-the-vibe-platform

Create .env file at project root
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_key
GITHUB_TOKEN=your_github_token
NETLIFY_TOKEN=your_netlify_token

Install & Run Backend
cd backend
npm install
npm run dev

Install & Run Frontend
cd frontend
npm install
npm run dev

Frontend will run on localhost:3000
Backend will run on localhost:5000

🎞 Demo Video
Video link will be submitted with final submission.

Live Deployment
Frontend on Vercel : https://cogneeva-ldlx-ac411x30x-aaditya-salgaonkars-projects.vercel.app/ <br>
Backend on Render : https://cogneeva.onrender.com/

👨‍💻 Author
Aaditya Salgaonkar
Full Stack Engineer | Goa, India 🇮🇳
📧 aadityasalgaonkar@gmail.com

📄 License
MIT License — for hackathon and educational purposes.

🙏 Acknowledgements
Hack The Vibe organizers & Tech Horizons Club
Supabase, OpenRouter, Netlify APIs
All judges and reviewers for their time & expertise

