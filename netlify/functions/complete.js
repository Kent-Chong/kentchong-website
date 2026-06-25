// Prompt Lab backend (Netlify Function) — keeps the OpenAI key server-side and
// proxies to the OpenAI Chat Completions API. Served at /.netlify/functions/complete;
// netlify.toml redirects /api/complete -> here, so the client path stays /api/complete.
// Zero dependencies — uses Node 18+ global fetch (NODE_VERSION pinned in netlify.toml).
//
// Setup: set OPENAI_API_KEY in Netlify → Site configuration → Environment variables
// (local `netlify dev` reads .env). Never put the key in client JS.
// Model: gpt-4o-mini (fast + cheap). Swap to "gpt-4o" for higher quality at higher cost.

const SYSTEM =
  "You are answering on Kent Chong's personal website. Kent is a Data Analyst & " +
  "Full Stack Developer at Gruda Technologies and an AI/Data Coach at LEAD, based " +
  "in Kuala Lumpur. He started as a civil engineer (MRT Line 2, ROL, KTM lines, " +
  "5-storey commercial in Singapore), moved into international marketing/B2B sales " +
  "(15+ countries), led a real-estate team to RM120M in 2021 group sales, then moved " +
  "into data/AI. He speaks English, Mandarin, Cantonese, Malay. Outside work: he " +
  "plays basketball, badminton, swimming, and billiards. Loves boardgames and recently " +
  "got into karting. Passionate about good food — makes the effort to find it everywhere " +
  "— and can cook too. Also draws. Keep responses tight, warm, conversational, " +
  "first-person if speaking as Kent — no marketing fluff. Respond in plain text under 150 words.";

const json = (statusCode, obj) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(obj),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "POST only" });

  let prompt;
  try { prompt = JSON.parse(event.body || "{}").prompt; }
  catch (e) { return json(400, { error: "bad json" }); }

  if (!prompt || !String(prompt).trim()) return json(400, { error: "empty prompt" });
  if (!process.env.OPENAI_API_KEY) return json(500, { error: "server missing OPENAI_API_KEY" });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: String(prompt).slice(0, 2000) }, // cap = basic abuse guard
        ],
      }),
    });
    const data = await r.json();
    if (!r.ok) return json(502, { error: (data && data.error && data.error.message) || "api error" });
    const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return json(200, { text: text || "" });
  } catch (e) {
    return json(500, { error: "network error" });
  }
};
