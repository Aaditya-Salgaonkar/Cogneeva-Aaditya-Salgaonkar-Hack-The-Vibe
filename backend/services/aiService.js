// services/generateCodeFromAI.js

const fs    = require('fs');
const path  = require('path');
const axios = require('axios');
const {
  OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions',
  OPENROUTER_API_KEY
} = require('../config');

const TEMPLATE_DIR = path.join(__dirname, '../templates/basic-saas');

/** Remove leading/trailing fences and extract the JSON array substring */
function extractJsonArray(raw) {
  // Remove Markdown fences if any
  let s = raw.trim()
             .replace(/^```(?:json)?\r?\n/, '')
             .replace(/\r?\n```$/, '')
             .trim();
  const start = s.indexOf('[');
  const end   = s.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Could not locate JSON array in AI response');
  }
  return s.slice(start, end + 1);
}

/** Strip out unprintable/control chars (like \u0000) */
function cleanContent(str) {
  // Remove nulls and other C0 control chars except \r,\n,\t
  return str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

function parseAIResponse(raw) {
  const jsonText = extractJsonArray(raw);
  let files;
  try {
    files = JSON.parse(jsonText);
  } catch (err) {
    throw new Error('AI JSON parse error: ' + err.message);
  }
  if (
    !Array.isArray(files) ||
    files.some(f => typeof f.path !== 'string' || typeof f.content !== 'string')
  ) {
    throw new Error('Unexpected JSON structure');
  }
  // Clean each file’s content
  return files.map(({ path: p, content }) => ({
    path: p,
    content: cleanContent(content)
  }));
}

function walkTemplateDir(dir, prefix = '') {
  let results = [];
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name);
    const relPath  = path.join(prefix, name).replace(/\\/g, '/');
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(walkTemplateDir(fullPath, relPath));
    } else {
      let content = fs.readFileSync(fullPath, 'utf8');
      results.push({ path: relPath, content: cleanContent(content) });
    }
  }
  return results;
}

exports.generateCodeFromAI = async (ideaPrompt) => {
  const engineeredPrompt = `
You are an expert full-stack SaaS engineer. Generate a fully deployable frontend codebase as a JSON array of objects:
[
  { "path": "relative/file/path.ext", "content": "escaped code here" },
  ...
]
✅ Use Next.js (TS, App Router), Tailwind CSS, React.
✅ Always include these baseline files:
   src/pages/index.tsx, src/pages/_app.tsx,
   tailwind.config.js, postcss.config.js,
   tsconfig.json, package.json, public/favicon.ico
✅ Pages: landing, login/signup, dashboard, create form, settings.
🚨 Escape all quotes, newlines, and slashes properly. Do NOT include null characters.
No extra text—output ONLY valid JSON.
Idea: "${ideaPrompt.trim()}"
`;

  try {
    const { data } = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          { role: 'system', content: 'Output ONLY a JSON array of { path, content }.' },
          { role: 'user',   content: engineeredPrompt }
        ],
        temperature: 0.3,
        max_tokens: 4096,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const aiOutput = data?.choices?.[0]?.message?.content;
    if (!aiOutput) throw new Error('No content returned from AI');

    // 1) Parse & sanitize
    let parsedFiles = parseAIResponse(aiOutput);

    // 2) Merge baseline files from TEMPLATE_DIR if they’re missing
    const baseline = [
      'src/pages/index.tsx',
      'src/pages/_app.tsx',
      'tailwind.config.js',
      'postcss.config.js',
      'tsconfig.json',
      'package.json',
      'public/favicon.ico'
    ];
    if (fs.existsSync(TEMPLATE_DIR)) {
      baseline.forEach(p => {
        if (!parsedFiles.some(f => f.path === p)) {
          const fp = path.join(TEMPLATE_DIR, p);
          if (fs.existsSync(fp)) {
            parsedFiles.push({ path: p, content: cleanContent(fs.readFileSync(fp, 'utf8')) });
          }
        }
      });
    } else {
      console.warn(`⚠️ TEMPLATE_DIR missing at ${TEMPLATE_DIR}.`);
    }

    return parsedFiles;

  } catch (err) {
    console.error('🧠 AI generation error:', err.message || err);

    // Fallback: serve full template if it exists
    if (fs.existsSync(TEMPLATE_DIR)) {
      return walkTemplateDir(TEMPLATE_DIR);
    }
    // Ultimately fail if no fallback
    throw new Error('AI generation failed and no fallback template found.');
  }
};
