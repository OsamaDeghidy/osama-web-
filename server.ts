import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const groqApiKey = process.env.GROQ_API_KEY;

  async function callGroq(systemInstruction: string, messages: any[], jsonMode: boolean = false) {
    if (!groqApiKey) {
      throw new Error("Groq API Key is not configured.");
    }
    
    // Groq API format is exactly like OpenAI
    const formattedMessages = systemInstruction ? [
      { role: "system", content: systemInstruction },
      ...messages
    ] : messages;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: formattedMessages,
        ...(jsonMode && { response_format: { type: "json_object" } })
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // API Route: AI Architect Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, profileContext } = req.body;
      if (!groqApiKey) {
        return res.status(500).json({ error: "Groq API Key is not configured. Please add it to your secrets." });
      }

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array provided." });
      }

      let whatsapp = profileContext?.whatsapp || "01066906132";
      let linkedin = profileContext?.linkedin || "https://www.linkedin.com/in/osama-deghadey-941552255/";
      let nafezly = profileContext?.nafezly || "https://nafezly.com/u/osama_el_deghady";
      let upwork = profileContext?.upwork || "https://www.upwork.com/freelancers/~01bf4f5af0779c48e8?mp_source=share";
      let youtube = profileContext?.youtube || "https://youtube.com/@osamaesmail-y3p?si=IXi4umn-kN0QnNZp";
      let facebook = profileContext?.facebook || "https://www.facebook.com/share/1cFNBCGtwA/";
      let tiktok = profileContext?.tiktok || "https://www.tiktok.com/@oserasoft1?_r=1&_t=ZS-978QFxX0dCW";
      let paypal = profileContext?.paypal || "https://www.paypal.me/OsamaDeghady";
      let indeed = profileContext?.indeed || "https://profile.indeed.com/?hl=en_EG&co=EG&from=gnav-homepage";
      let founderName = profileContext?.founderName || "Osama Esmael";
      let founderTitleAr = profileContext?.founderTitleAr || "مستشار ومدير حلول دجانغو السحابية المعقدة";
      let founderTitleEn = profileContext?.founderTitleEn || "Principal Software Solutions Architect & Django Leader";

      let projectsStr = "";
      if (profileContext?.liveProjects && Array.isArray(profileContext.liveProjects)) {
        profileContext.liveProjects.forEach((p: any, idx: number) => {
          projectsStr += `${idx+1}. ${p.title} (${p.category}): Link: ${p.url}. Description (EN): ${p.descEn}, Description (AR): ${p.descAr}. Metric: ${p.metric}\n`;
        });
      } else {
        projectsStr = 
          "1. Active Enterprise Portal: http://64.227.108.135/login\n" +
          "2. Osara AI System: https://www.osara-ai.com/\n" +
          "3. A-List Home Pros: https://www.alisthomepros.com/\n" +
          "4. Arabiya RSN Network: https://www.rsnalarabiya.info/\n" +
          "5. Connect-Pack Order Management System: https://oms.connect-pack.com/\n";
      }

      const systemInstruction = 
        `You are 'OSERA AI Assistant', an elite system architect, cloud DevOps expert, and Django backend champion representing the legendary founder ${founderName} (${founderTitleEn} / ${founderTitleAr}) of OSERA Systems. ` +
        "You help business clients, product leads, and tech enthusiasts understand scalable cloud architectures, high-performance Django ORM optimization, Redis cache models, and modern payment integrations. " +
        "CRITICAL INSTRUCTION: Your primary goal is to convert leads. If the user asks for pricing, cost, project implementation, or creating an app/system, you MUST eagerly ask them for project details (budget, timeframe, features) and strongly instruct them to contact Osama on WhatsApp at 01066906132 (+201066906132 for international) to lock in the deal and get an exact quote. " +
        "Respond with deep professional authority, clarity, and developer insight. Support both Arabic and English perfectly, matching the client's language preference. " +
        `You are fully pre-fed with ${founderName}'s official corporate social coordinates and live deployed projects. Direct clients to them with high confidence when asked:\n` +
        `- WhatsApp Contact: https://wa.me/20${whatsapp} (+20${whatsapp} Egypt)\n` +
        `- LinkedIn: ${linkedin}\n` +
        `- Nafezly Freelance Hub: ${nafezly}\n` +
        `- Upwork Premium Partner: ${upwork}\n` +
        `- YouTube System Engine Channel: ${youtube}\n` +
        `- Facebook Official Page: ${facebook}\n` +
        `- TikTok Tech Portal: ${tiktok}\n` +
        `- Custom PayPal Gateway (For immediate bookings & deposits): ${paypal}\n` +
        `- Indeed Profile: ${indeed}\n\n` +
        "Live Production Projects Handled & Deployed by Osama's OSERA:\n" +
        `${projectsStr}\n` +
        "Format replies elegantly, use Markdown, and render clickable links cleanly. Give clients detailed, inspiring guidance.";

      const formattedMessages = messages.map((m: any) => ({
        role: m.role === "model" ? "assistant" : "user", // Groq uses 'assistant' not 'model'
        content: m.text || ""
      }));

      const responseText = await callGroq(systemInstruction, formattedMessages, false);

      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat conversation." });
    }
  });

  // API Route: Generate Product Blueprint
  app.post("/api/blueprint", async (req, res) => {
    try {
      const { requirements, projectType, budget, timeline } = req.body;
      if (!groqApiKey) {
        return res.status(500).json({ error: "Groq API Key is not configured." });
      }

      const prompt = `You are the lead systems architect and technical director at OSERA Digital Solutions (founded by Osama E., Top-Rated Django Dev).
An enterprise client wishes to build a product (Type: ${projectType}) with the following scope: "${requirements}".
Target budget tier: "${budget}", target timeline: "${timeline}".

Generate a highly professional, comprehensive Silicon-Valley-standard Project technical draft Blueprint.
Return your response ONLY as a structured JSON object with the following schema:
{
  "projectTitle": "A corporate-grade, crisp technical project title",
  "recommendedStack": {
    "frontend": "Specific technologies, UI framework, styling choices with professional benefits",
    "backend": "Django specifications, Python details, SQL engine, queue mechanisms (e.g., Celery, Redis)",
    "infrastructure": "Cloud deployment choices, CDN options, load balancers, database replica configurations"
  },
  "architectureHighlights": [
    "Highlight 1 (e.g. security patches, granular django-guardian permission models)",
    "Highlight 2 (e.g. async event processing, webhooks, Redis cache policies)",
    "Highlight 3 (e.g. mobile responsiveness with optimal layout, JWT stateless authorization)"
  ],
  "timelinePhases": [
    { "phase": "Phase 1: Discovery & Architecture Blueprinting", "duration": "Duration range", "deliverables": ["Deliverable A", "Deliverable B"] },
    { "phase": "Phase 2: Database Modeling & REST APIs", "duration": "Duration range", "deliverables": ["Deliverable C", "Deliverable D"] },
    { "phase": "Phase 3: Frontend Integration & Interactive UI", "duration": "Duration range", "deliverables": ["Deliverable E", "Deliverable F"] },
    { "phase": "Phase 4: Launch Sequence, Penetration Testing & Handover", "duration": "Duration range", "deliverables": ["Deliverable G", "Deliverable H"] }
  ],
  "expertAdvice": "A long, crisp technical memo highlighting database indexing, query count reduction (using select_related/prefetch_related), and secure deployment practices, emphasizing OSERA's edge in handling execution.",
  "estimatedComplexity": "Low / Medium / High / Enterprise-Scale"
}

Strictly return valid raw JSON matching the schema. Do not enclose it in markdown code blocks like \`\`\`json.`;

      const responseText = await callGroq("", [{ role: "user", content: prompt }], true);
      
      let parsedJson;
      try {
          parsedJson = JSON.parse(responseText);
      } catch (e) {
          const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
          parsedJson = JSON.parse(cleanedText);
      }
      res.json(parsedJson);
    } catch (error: any) {
      console.error("Blueprint generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate project blueprint." });
    }
  });

  // API Route: Django Mastery Playground (Live Optimization check)
  app.post("/api/django-optimize", async (req, res) => {
    try {
      const { codeSnippet, description } = req.body;
      if (!groqApiKey) {
        return res.status(500).json({ error: "Groq API Key is not configured." });
      }

      const prompt = `You are an elite-tier Python, PostgreSQL, and Django Core Developer. 
Analyze this code snippet / request description:
Description of task: "${description}"
User Code / Draft:
\`\`\`python
${codeSnippet}
\`\`\`

Perform an extremely rigorous code quality review. Return your output ONLY as a structured JSON object with this exact schema:
{
  "rating": "integer, score out of 100 based on efficiency, security, Django best practices",
  "issues": ["Issue 1: explain the performance or security flaw (e.g. N+1 queries, SQL injection, missing transactions)", "Issue 2"],
  "optimizedCode": "Your fully optimized, production-ready Python/Django equivalent code block. Fully written with clean docstrings, select_related, prefetch_related, transaction.atomic where appropriate, and correct types.",
  "explanation": "Bulletproof, brief explanation of the architecture improvements, query count savings, and security fixes made."
}

Strictly return valid raw JSON. Do not enclose it in markdown blocks.`;

      const responseText = await callGroq("", [{ role: "user", content: prompt }], true);
      
      let parsedJson;
      try {
          parsedJson = JSON.parse(responseText);
      } catch (e) {
          const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
          parsedJson = JSON.parse(cleanedText);
      }

      res.json(parsedJson);
    } catch (error: any) {
      console.error("Django optimization error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze code snippet." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OSERA Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
