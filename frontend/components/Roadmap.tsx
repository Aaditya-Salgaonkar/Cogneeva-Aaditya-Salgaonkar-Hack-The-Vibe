import React from 'react';
import { FaLightbulb, FaListOl, FaRobot, FaCode, FaGithub, FaRocket, FaGlobe } from 'react-icons/fa';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Roadmap() {
  const steps = [
    {
      icon: <FaLightbulb className="text-6xl text-[#2563EB]" />,
      title: "Step 1 — Share Your Vision",
      desc: "Simply describe your startup idea in plain language — no technical jargon required. Our AI understands your intent and starts planning instantly."
    },
    {
      icon: <FaListOl className="text-6xl text-[#60A5FA]" />,
      title: "Step 2 — Interactive Blueprinting",
      desc: "Go through our multi-step wizard that auto-generates architecture: pick features, UI design, authentication, and database schema with extreme customization."
    },
    {
      icon: <FaRobot className="text-6xl text-[#10B981]" />,
      title: "Step 3 — Galuxium Orchestration",
      desc: "Our proprietary Galuxium engine activates multiple open-source AI models, breaking your blueprint into highly-optimized code structures for frontend, backend, and deployment."
    },
    {
      icon: <FaCode className="text-6xl text-[#8B5CF6]" />,
      title: "Step 4 — Fully-Generated Codebase",
      desc: "Receive an instantly generated full-stack codebase, covering authentication, landing page, API routes, and database integrations — 100% production-ready."
    },
    {
      icon: <FaGithub className="text-6xl text-[#2563EB]" />,
      title: "Step 5 — Auto GitHub Sync",
      desc: "Your full code is automatically pushed to your private GitHub repo with fully-configured CI/CD workflows. Ready for continuous development."
    },
    {
      icon: <FaRocket className="text-6xl text-[#10B981]" />,
      title: "Step 6 — One-Click Deployment",
      desc: "Your app is automatically deployed via Vercel’s enterprise-grade hosting. You’ll receive live production URLs instantly accessible globally."
    },
    {
      icon: <FaGlobe className="text-6xl text-[#60A5FA]" />,
      title: "Step 7 — Scale to the World",
      desc: "Monitor, iterate, customize — take full control over your live SaaS product. Scale confidently, backed by secure, modular architecture."
    }
  ];

  return (
    <section className="w-full bg-[#FFFFFF] text-[#1A1A1A] py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-5xl font-extrabold leading-tight mb-20 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          Build Your SaaS in 7 Seamless Steps
        </h2>

        <div className="relative flex flex-col items-center">
          <div className="absolute h-full w-1 bg-gradient-to-b from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-full"></div>

          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`w-full flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} ${idx === 0 ? '' : '-mt-32'}`}>

              <div className={`w-full md:w-1/2 px-6 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="p-10 bg-[#F9FAFB] rounded-3xl shadow-xl border border-[#E5E7EB] hover:scale-[1.03] transition-all duration-300">
                  <div className="mb-8 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4">{step.title}</h3>
                  <p className="text-[#4B5563] leading-relaxed text-lg">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/signup">
          <Button className='bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] z-10 py-8 hover:scale-105 transition-all duration-300'>
            <div className="px-8 text-2xl font-extrabold rounded-3xl text-white">
              Start Building Now
            </div>
          </Button></Link>
        </div>
      </div>
    </section>
  );
}
