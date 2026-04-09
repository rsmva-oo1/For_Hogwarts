// server.js — NutriTech Backend
// ─────────────────────────────────────────────────────────────
//  This is the heart of the backend.
//  It receives user data from the frontend,
//  calls the Groq AI API (or falls back to local logic),
//  and sends back personalized nutrition advice.
// ─────────────────────────────────────────────────────────────

// 1. Load environment variables from .env file FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { generateFallbackResponse } = require("./fallbackData");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
// cors() allows our frontend (different domain/port) to talk to this server
app.use(cors());
// express.json() lets us read JSON from request bodies
app.use(express.json());

// ── Health Check ────────────────────────────────────────────
// Simple endpoint to confirm the server is alive
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "NutriTech API is running 🥗",
    version: "1.0.0",
  });
});

// ── Main Nutrition Endpoint ──────────────────────────────────
//
//  POST /api/nutrition
//
//  Request body (JSON):
//  {
//    "name": "Jasur",          ← user's name (optional)
//    "age": 28,                ← user's age (optional)
//    "condition": "diabetes",  ← health condition or "healthy"
//    "goal": "lose weight",    ← user's goal (optional)
//    "question": "What should I eat for breakfast?" ← free-form question (optional)
//  }
//
//  Response (JSON):
//  {
//    "success": true,
//    "data": { intro, foods, tip, avoidSection, source }
//  }

app.post("/api/nutrition", async (req, res) => {
  try {
    const { name, age, condition, goal, question } = req.body;

    // Basic validation — condition is the only required field
    if (!condition) {
      return res.status(400).json({
        success: false,
        error: "Please provide a 'condition' field (e.g. 'diabetes', 'healthy', 'weight_loss')",
      });
    }

    // ── Try Groq API first ──────────────────────────────────
    const groqKey = process.env.GROQ_API_KEY;

    if (groqKey && groqKey !== "your_groq_api_key_here") {
      try {
        console.log("🤖 Calling Groq API...");
        const aiResponse = await callGroqAPI({ name, age, condition, goal, question }, groqKey);
        return res.json({ success: true, data: aiResponse });
      } catch (apiError) {
        // If Groq fails for any reason, log it and fall through to fallback
        console.warn("⚠️ Groq API failed, using fallback:", apiError.message);
      }
    } else {
      console.log("ℹ️ No Groq API key found — using fallback logic");
    }

    // ── Fallback: use local predefined data ─────────────────
    const fallbackData = generateFallbackResponse({ name, age, condition, goal });
    return res.json({ success: true, data: fallbackData });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong on the server. Please try again.",
    });
  }
});

// ── Groq API Call Function ───────────────────────────────────
//
//  This function builds a prompt and sends it to Groq's free LLM API.
//  Groq hosts open-source models (like llama3-8b) for FREE.
//
//  How it works:
//  1. We build a detailed "system prompt" (instructions for the AI)
//  2. We build a "user message" with the person's health profile
//  3. We ask the AI to respond in structured JSON
//  4. We parse and return that JSON

async function callGroqAPI(profile, apiKey) {
  const { name, age, condition, goal, question } = profile;

  const systemPrompt = `You are NutriBot, a friendly and knowledgeable nutrition assistant.
You help people find safe and healthy food choices based on their health conditions.
Always respond in JSON format with this exact structure:
{
  "intro": "A warm, personalized 1-2 sentence intro",
  "foods": [
    { "name": "Food name", "reason": "Why it's good for this condition" },
    { "name": "Food name", "reason": "Why it's good for this condition" },
    { "name": "Food name", "reason": "Why it's good for this condition" }
  ],
  "tip": "One practical health tip for this person",
  "avoidSection": "Comma-separated list of foods to avoid, or empty string",
  "source": "groq"
}
Rules:
- Always recommend exactly 3 foods
- Keep reasons short (under 10 words each)
- The tip should be actionable and specific
- Mention Uzbek foods when relevant (plov, samsa, shurpa, lagman, mastava)`;

  const userMessage = `My name is ${name || "a user"}, I am ${age || "an adult"} years old.
Health condition: ${condition}
Goal: ${goal || "eat healthier"}
${question ? `My question: ${question}` : ""}
Please give me 3 food recommendations.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // This is how we send the API key securely — in the header, from .env
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",  // Free model on Groq
      max_tokens: 600,
      temperature: 0.7,         // 0 = predictable, 1 = creative. 0.7 is a good balance.
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API returned ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  // Extract the text content from Groq's response
  const rawText = data.choices[0].message.content;

  // Parse the JSON that the AI returned
  // We strip markdown code fences in case the AI wrapped it in ```json ... ```
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return parsed;
}

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ✅ NutriTech Backend running at http://localhost:${PORT}
  📡 Endpoints:
     GET  /             → health check
     POST /api/nutrition → main AI endpoint
  🔑 Groq API: ${process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here" ? "✅ Configured" : "❌ Not set (fallback mode)"}
  `);
});
