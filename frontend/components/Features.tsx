import React from "react";

export default function Features() {
  const features = [
    {
      title: "Zero-Code AI MVP Generator",
      desc: "Instantly transform your startup idea into a production-ready, fully-coded SaaS platform without writing a single line of code.",
      icon: "🚀",
    },
    {
      title: "Dynamic AI-Driven Prompt Engine",
      desc: "Our Galuxium core deeply interacts with users to auto-architect databases, landing pages, authentication, and backend flows.",
      icon: "🧠",
    },
    {
      title: "Customizable Multi-Step Wizard",
      desc: "Highly detailed step-by-step blueprint builder with real-time validations, tech-stack selection, UI styling, and scalability configurations.",
      icon: "📝",
    },
    {
      title: "Real-Time GitHub Code Deployment",
      desc: "Instantly generate, commit, and deploy your full codebase to GitHub and Vercel using powerful CI/CD pipelines.",
      icon: "💻",
    },
    {
      title: "Modular & Scalable Architecture",
      desc: "All MVPs follow microservices best practices, modular clean code, and scalable deployment pipelines powered by industry standards.",
      icon: "🏗️",
    },
    {
      title: "Fully Managed AI Orchestration",
      desc: "Runs entirely on open-source models like LLaMA 2, Code LLaMA & Gemini 1.5 Pro — ensuring high performance at zero cost.",
      icon: "⚙️",
    },
    {
      title: "Ultra-Secure Cloud Integration",
      desc: "Backed by Supabase and Oracle’s free-tier cloud infra, all deployments feature encrypted databases, secured endpoints, and isolated user spaces.",
      icon: "🔒",
    },
    {
      title: "Extensible Plugin Marketplace",
      desc: "Pluggable add-on ecosystem for UI templates, payment integrations, SaaS extensions and custom AI fine-tuning modules.",
      icon: "🧩",
    },
    {
      title: "Self-Learning Continuous Improvement",
      desc: "Our Galuxium core adapts based on user feedback, usage patterns, and code analysis to improve its future code generation quality.",
      icon: "📈",
    },
  ];

  return (
    <section className="w-full bg-white text-[#1A1A1A] py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold leading-tight mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] pb-5">
          Experience The Power{" "}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-3xl shadow-xl border border-[#E0F2FE] hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-6 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] text-white text-4xl shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
