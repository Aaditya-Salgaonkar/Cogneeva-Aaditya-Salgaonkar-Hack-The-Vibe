## 🚀 SaaS MVP Builder – AI-Powered Startup Generator

*Submission for: Hack The Vibe 2025 (SaaS Domain)*  
*Built by: Aaditya Salgaonkar*  
*Duration: 48 hours solo build*

---

## 🧩 The Problem We're Solving

Every year, thousands of startup ideas die young — not because they're bad ideas, but because founders lack the technical skills or resources to execute.

- Hiring developers is expensive
- Building MVPs takes weeks (or months)
- No-code tools are limited or require technical know-how

The startup ecosystem has a massive **"execution gap."**

---

## 💡 Our Solution: Zero-to-MVP in Minutes

I built a full-stack AI-powered platform that allows any founder to simply describe their idea in natural language — and receive a **fully functional, production-ready SaaS MVP** within minutes.

**No coding. No teams. No blockers. Just describe your startup idea.**

---

### 🔥 Core Features

### 🚀 Natural Language → SaaS MVP Generator

- Enter any startup idea as a simple text prompt
- The AI engine understands the intent and generates:
  - Responsive landing page
  - Full authentication system (via Supabase)
  - Database schema and tables
  - REST API routes and server logic
  - Frontend components (TailwindCSS-based UI)
  - Full folder structure, configs, and package management

### 🤖 Galuxium AI Co-Pilot (Powered by Gemini 1.5 Flash)

> **ChatGPT-style assistant for building your SaaS**

Galuxium AI is an inbuilt conversational AI assistant that interacts with the user just like ChatGPT — built using **Gemini 1.5 Flash API**. It acts as a technical co-founder to:

- Ask clarifying questions on ambiguous prompts
- Help restructure poor product ideas into well-scoped MVPs
- Guide the user step-by-step through architecture and logic
- Provide real-time feedback and improvement suggestions

It ensures that users — even with no technical background — can still build and refine meaningful, scalable MVPs using just natural language conversation.

### 🧠 AI Engine: Personalized Model Orchestration

The real backbone of the platform is its multi-model orchestration system:

- **Prompt Understanding + Task Breakdown**: Galuxium validates and improves input before execution
- **Model Execution via OpenRouter**:
  - Uses **Mistral 8x7B Instruct** for generating full stack file-by-file codebase
  - Each task (auth, DB, routes, UI, config) is generated in isolation and then merged
- **Multi-Stage Prompt Chunking**: Breaks long prompts into smaller, well-structured subtasks
- **Output Stitching**: Automatically compiles and organizes all generated code into a real-world working file system

**This isn’t just a fancy code snippet generator — this is full codebase production, ready to run, commit, or deploy.**

## 🖥 Code Management

- Download complete codebase as a ZIP file
- Push directly to GitHub — automated repo creation, file commits, README setup
- One-click Netlify deployment — serverless live preview in seconds

## 📊 MVP Analytics Dashboard

Monitor all MVPs you've built:

- Deployment status (Testing, Live, Deployed)
- Generation timestamps
- Token usage, AI cost per build
- Revenue estimation & monetization potential

## 👤 Supabase Account Management

- Auth via email provider (Supabase)
- Clean profile UI showing name, avatar, and personal projects

## 🔬 Future-Proof AI Lab (Coming Soon)

- Fine-tune generation parameters: temperature, max tokens, prompt templates
- Explore multi-model switching for different generation strategies

---

## ⚙️ Tech Stack

| Layer           | Stack |
|------------------|-------|
| Frontend         | Next.js 14 (App Router, Server Components) |
| Backend          | Node.js + Express |
| Database & Auth  | Supabase (PostgreSQL, Auth, Storage) |
| AI Models        | Mistral 8x7B Instruct via OpenRouter + Gemini 1.5 Flash |
| Styling          | TailwindCSS |
| Deployment       | GitHub API + Netlify API |
| AI Chat Engine   | Gemini 1.5 Flash (for Galuxium AI) |
| Hosting          | Vercel (Frontend) + Render (Backend) |

---

## 🧪 Technical Highlights

✅ Prompt chunking + multi-task orchestration  
✅ Full-stack code generation (not snippets — complete file trees)  
✅ Conversational AI refinement with Galuxium  
✅ Automatic GitHub repo creation + commits  
✅ Netlify deployment through code  
✅ Supabase for secure, production-grade auth  
✅ ZIP download of all generated code  
✅ Scalable architecture designed for SaaS platforms

---

## 📈 Startup Potential

**The long-term vision: SaaS-as-a-Service**

- Democratizes SaaS startup creation for non-technical founders
- Productizable as a SaaS tool for solopreneurs, incubators, accelerators

**Future expansions:**

- Internal prototyping engine for large enterprises
- AI-powered CTO copilot for VC-backed startup founders
- Marketplace of AI-generated SaaS templates

💸 **Monetization Avenues:**

- Usage-based billing via OpenRouter token cost
- Tiered subscription models
- Pay-per-generation or pay-per-feature SaaS bundles
- Branded GitHub + Netlify integrations for white-label deployment

---

## 🛠️ Setup Instructions

## Prerequisites

- Node.js 18+
- Supabase project (Auth + DB)
- OpenRouter API key
- Gemini API key (Google Cloud)
- GitHub & Netlify personal access tokens

## 🧬 Clone Repository

git clone https://github.com/Aaditya-Salgaonkar/hack-the-vibe-platform.git
cd hack-the-vibe-platform

🌐 Environment Variables
Create a .env file:
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key
GITHUB_TOKEN=your_github_token
NETLIFY_TOKEN=your_netlify_token

🧪 Run Backend
cd backend
npm install
npm run dev  # http://localhost:5000

🎨 Run Frontend
cd frontend
npm install
npm run dev  # http://localhost:3000

📽️ Demo Video
🧠 Includes a walk-through of Galuxium AI + full build flow : Submitted on devpost

🌍 Live Deployment
🔗 Frontend: https://cogneeva-ldlx-ac411x30x-aaditya-salgaonkars-projects.vercel.app/ <br>
🔗 Backend: https://cogneeva.onrender.com/

---

### 👨‍💻 Author
## Aaditya Salgaonkar
## Full Stack Engineer | Goa, India 🇮🇳
## 📧 aadityasalgaonkar@gmail.com

## 📄 License
MIT License — for hackathon and educational purposes.

## 🙏 Acknowledgements
Hack The Vibe organizers & Tech Horizons Club
Supabase, OpenRouter, Google Gemini API, Netlify, GitHub
Judges & mentors who reviewed and guided
