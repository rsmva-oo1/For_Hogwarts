# 🥗 NutriTech — AI-Powered Nutrition Web App

> A student project that upgrades a static nutrition website into a real full-stack AI application.
> Built with Node.js, Express, and the free Groq LLM API.

---

## What I Built

This project turns a static Uzbek nutrition website (NutriTechUZ) into a working AI-powered application. A user enters their name, age, health condition (like diabetes or hypertension), and a question. The system sends that data to a backend, which either:

1. Calls the **Groq AI API** (free, fast) to get a personalized nutrition response from a real language model, or
2. Falls back to **predefined local logic** if no API key is set — so the app always works, even without internet.

The response shows 3 food recommendations, a health tip, and foods to avoid — all tailored to the user's condition.

---

## Technologies Used

| Technology | What it does | Why I chose it |
|---|---|---|
| **HTML/CSS/JS** | The frontend (what users see) | No framework needed — keeps it simple |
| **Node.js** | JavaScript runtime for the backend | Free, fast, widely used |
| **Express** | Web framework for Node.js | Makes building API endpoints very easy |
| **dotenv** | Loads `.env` file into `process.env` | Keeps API keys out of the code |
| **node-fetch** | Makes HTTP requests from Node.js | Lets the backend call external APIs |
| **Groq API** | Free AI API (hosts LLaMA 3 model) | Fast, completely free, no credit card required |
| **CORS** | Middleware for cross-origin requests | Lets the frontend talk to the backend |

---

## How LLM APIs Work (Simple Explanation)

Think of a Language Model (LLM) like a very smart assistant that reads text and writes text back.

You send it two things:
1. A **system prompt** — instructions like "You are a nutrition expert. Always respond in JSON."
2. A **user message** — the actual question or data, like "I have diabetes, what should I eat?"

The model reads both and generates a response.

When I call the Groq API, my code does this:
```
My backend → [HTTP POST] → Groq server → LLaMA 3 model reads prompt → generates JSON → [response] → my backend → [JSON] → frontend
```

The model doesn't "know" the user — I give it all the context in each request. This is called **stateless** — each API call is independent.

I ask the model to respond in JSON format so I can easily parse and display the data.

---

## How Frontend and Backend Communicate

This is called a **client-server architecture**.

```
[Browser — frontend]  ←→  [Node.js — backend]  ←→  [Groq API]
```

Step by step:
1. User fills the form and clicks the button
2. Frontend JavaScript uses `fetch()` to send a **POST request** to `http://localhost:3001/api/nutrition`
3. The request body contains JSON: `{ name, age, condition, goal, question }`
4. The backend receives it, builds a prompt, calls Groq API
5. Groq returns a JSON response
6. The backend sends that JSON back to the frontend
7. The frontend renders the food cards and health tip

The two sides speak using **JSON** (JavaScript Object Notation) — a simple text format for structured data.

---

## How the API Key Is Secured

**The golden rule: API keys never go in the frontend (HTML/JS) code.**

Why? Because frontend code is visible to everyone — anyone can open DevTools and read it.

Instead:
1. The API key lives in a `.env` file on the backend server
2. The `.env` file is listed in `.gitignore` so it never gets committed to Git
3. The backend reads it with `require('dotenv').config()` into `process.env.GROQ_API_KEY`
4. When calling the Groq API, the key goes in the HTTP Authorization header — encrypted in transit via HTTPS
5. The frontend never sees the key — it only talks to your backend

```
Frontend → your backend → Groq API
                ↑
          key stored here (server only)
```

---

## Project Structure

```
nutri-app/
├── backend/
│   ├── server.js          ← Main Express server
│   ├── fallbackData.js    ← Offline nutrition logic
│   ├── package.json       ← Dependencies
│   ├── .env.example       ← Template for your .env file
│   ├── .env               ← YOUR actual keys (never commit this!)
│   └── .gitignore
│
├── frontend/
│   └── index.html         ← Complete frontend (single file)
│
└── README.md
```

---

## How to Run Locally

### Step 1 — Get a free Groq API key (5 minutes)

1. Go to https://console.groq.com
2. Sign up with Google/email (free, no credit card)
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with `gsk_...`)

### Step 2 — Set up the backend

```bash
# Go into backend folder
cd nutri-app/backend

# Install dependencies
npm install

# Create your .env file from the template
cp .env.example .env

# Open .env and paste your Groq key
# GROQ_API_KEY=gsk_your_key_here
```

Edit `.env`:
```
GROQ_API_KEY=gsk_your_actual_key_here
PORT=3001
```

### Step 3 — Start the backend

```bash
# Start with auto-reload (recommended during development)
npm run dev

# Or start normally
npm start
```

You should see:
```
✅ NutriTech Backend running at http://localhost:3001
🔑 Groq API: ✅ Configured
```

### Step 4 — Open the frontend

Just open `frontend/index.html` in your browser. No server needed for the frontend.

**Or** if you want to serve it with a simple server:
```bash
# In the frontend folder
npx serve .
```

### Step 5 — Test it

1. Open `frontend/index.html`
2. Select "Qandli diabet" (Diabetes)
3. Click the button
4. You should see 3 food recommendations!

### Testing the backend directly (optional)

```bash
curl -X POST http://localhost:3001/api/nutrition \
  -H "Content-Type: application/json" \
  -d '{"name":"Jasur","age":28,"condition":"diabetes","goal":"eat healthier"}'
```

---

## Problems I Faced and How I Solved Them

### Problem 1: CORS Error
**What happened:** The browser blocked frontend requests to the backend with "CORS policy" error.
**Why:** Browsers block requests between different origins (e.g., file:// and localhost:3001) for security.
**Solution:** Added `app.use(cors())` to the Express server. This adds special headers that tell the browser "it's okay, this is allowed."

### Problem 2: AI returns irregular JSON
**What happened:** Sometimes the LLM wraps its JSON in markdown code fences like ```json ... ```
**Solution:** Before parsing, I strip those fences: `rawText.replace(/\`\`\`json|\`\`\`/g, "").trim()`

### Problem 3: App breaks when no API key
**What happened:** If `GROQ_API_KEY` is missing, the whole app crashed.
**Solution:** I added a fallback system. The backend checks: does the key exist and is it real? If not, it uses `fallbackData.js` instead. The frontend still works perfectly — it just shows a "Local data" badge instead of "Groq AI."

### Problem 4: Loading state confusion
**What happened:** Users clicked the button multiple times while waiting, causing duplicate requests.
**Solution:** Disabled the button during loading (`submitBtn.disabled = true`) and re-enabled it after.

---

## What I Learned

1. **How to build a REST API** — A backend that listens for HTTP requests and returns JSON responses.

2. **How to call an AI API** — LLMs are just HTTP endpoints. You send a prompt, you get text back. The "magic" is just a very well-designed HTTP request.

3. **Why environment variables matter** — It's not just convention. It's the difference between an API key being secret and it being leaked on GitHub.

4. **Graceful degradation** — Apps should keep working even when external services fail. My fallback system means the app is always useful.

5. **Frontend-backend separation** — The frontend only handles display. The backend handles logic and secrets. This separation is fundamental to web development.

6. **Prompt engineering** — How you write the system prompt dramatically changes the AI's output. Asking it to respond in JSON with a specific schema makes the response predictable and parseable.

---

## Bonus: Personalization Features

The app personalizes responses based on:
- **Name** — The greeting uses your name
- **Age** — Included in the AI prompt for age-appropriate advice
- **Condition** — Completely different recommendations per condition
- **Goal** — "Lose weight" vs "gain energy" changes the focus
- **Free-form question** — You can ask anything specific

The fallback system also includes Uzbek-specific foods (plov, samsa, mastava, shurpa) to make recommendations culturally relevant.

---

## Deploying to Production

**Backend → Render.com (free)**
1. Push backend to GitHub
2. Go to render.com → New Web Service
3. Connect repo, set Build Command: `npm install`, Start Command: `node server.js`
4. Add environment variable: `GROQ_API_KEY=your_key`

**Frontend → Netlify (free)**
1. Change `API_URL` in `index.html` from `http://localhost:3001` to your Render URL
2. Drag and drop the `frontend/` folder onto netlify.com

---

*Built by a student learning full-stack development. Technologies: Node.js, Express, Groq (LLaMA 3), Vanilla JS.*
