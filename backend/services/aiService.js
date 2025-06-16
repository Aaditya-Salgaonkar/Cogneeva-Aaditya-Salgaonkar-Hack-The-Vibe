// backend/services/aiService.js

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { OPENROUTER_API_KEY, OPENROUTER_API_URL } = require('../config');

const systemPrompt = `You are a world-class SaaS code generator. Output ONLY valid code inside triple backticks. No explanation, no notes.`;

// EXPANDED FULL TASK LIST
const taskList = [
  {
    file: 'package.json',
    prompt: `Generate a valid package.json for SaaS with Next.js (App Router), TypeScript, Tailwind CSS 3, Prisma ORM, PlanetScale, Clerk Auth, React 18, ESLint & Prettier.`,
  },
  {
    file: 'tsconfig.json',
    prompt: `Generate strict tsconfig.json for Next.js App Router project using TypeScript 5.2+.`,
  },
  {
    file: 'tailwind.config.js',
    prompt: `Generate tailwind.config.js for Next.js App Router with Tailwind CSS 3.`,
  },
  {
    file: 'postcss.config.js',
    prompt: `Generate postcss.config.js for Tailwind CSS 3 and Next.js.`,
  },
  {
    file: 'src/app/layout.tsx',
    prompt: `Generate layout.tsx for Next.js App Router SaaS project with ClerkProvider wrapping children and navigation menu with routes: Dashboard, Projects, Billing, Analytics, Settings.`,
  },
  {
    file: 'src/app/page.tsx',
    prompt: `Generate beautiful SaaS landing page with hero section, feature grid, customer testimonials, pricing section, FAQ, and CTA using Tailwind CSS 3.`,
  },
  {
    file: 'src/app/sign-in/[[...sign-in]]/page.tsx',
    prompt: `Generate Clerk-compatible sign-in page using Clerk React SDK.`,
  },
  {
    file: 'src/app/dashboard/page.tsx',
    prompt: `Generate full dashboard with metrics cards (Revenue, New Users, Active Subscriptions), recent activity table, and charts placeholder using React and Tailwind CSS 3.`,
  },
  {
    file: 'src/app/projects/page.tsx',
    prompt: `Generate Projects page with list of projects for the current logged-in user using Prisma, Clerk user id and Tailwind CSS 3.`,
  },
  {
    file: 'src/app/projects/new/page.tsx',
    prompt: `Generate page for creating a new project with form validation, saving to Prisma, using Tailwind CSS 3 and React Hook Form.`,
  },
  {
    file: 'src/app/billing/page.tsx',
    prompt: `Generate billing page using Stripe Billing portal integration, with subscription details and manage subscription button.`,
  },
  {
    file: 'src/app/analytics/page.tsx',
    prompt: `Generate analytics page with placeholder charts using Recharts or Chart.js and Tailwind CSS.`,
  },
  {
    file: 'src/app/settings/page.tsx',
    prompt: `Generate settings page with profile update form using Clerk useUser hook.`,
  },
  {
    file: 'prisma/schema.prisma',
    prompt: `Generate schema.prisma with User (Clerk ID), Projects (id, name, description, createdAt, updatedAt), Subscriptions (id, stripeId, plan, userId) allowing multiple projects per user.`,
  },
  {
    file: 'lib/prisma.ts',
    prompt: `Generate lib/prisma.ts with singleton PrismaClient pattern for Next.js App Router.`,
  }
];

// Safer extraction
function extractCode(content) {
  content = content.trim();
  const match = content.match(/```(?:\w+)?\n?([\s\S]*?)```/);
  if (match) return match[1].trim();
  if (content.length > 0) return content;
  throw new Error('No valid code content found');
}

async function generateFile(task) {
  const res = await axios.post(
    OPENROUTER_API_URL,
    {
      model: 'mistralai/mixtral-8x7b-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: task.prompt }
      ],
      temperature: 0,
      max_tokens: 4096
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const aiOutput = res?.data?.choices?.[0]?.message?.content;
  if (!aiOutput) throw new Error('AI response empty');
  return extractCode(aiOutput);
}

exports.generateSaaSCode = async (ideaPrompt) => {
  const generatedFiles = [];

  console.log('💡 Generating SaaS for idea:', ideaPrompt);

  for (const task of taskList) {
    console.log(`🚀 Generating file: ${task.file}`);
    const code = await generateFile(task);
    generatedFiles.push({ path: task.file, content: code });
  }

  console.log('✅ Generation complete');
  return generatedFiles;
};
